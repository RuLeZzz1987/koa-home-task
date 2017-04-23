import uuid from "uuid";
import models from "../../../models";
import mailer from "../../helpers/mailer";
import {
  PUBLIC_IP,
  ROUTES_RECOVERY_PASSWORD,
  ROUTES_AUTH,
  ROUTES_API_VERSION
} from "../../../config";

export default async (ctx, next) => {
  const { email } = ctx.request.body;
  const transaction = await models.sequelize.transaction();
  const user = await models.User.findOne({ email }, { transaction });

  if (!user) {
    await transaction.rollback();
    ctx.status = 404;
    ctx.body = {
      status: "error",
      message: `Can not find user with provided email ${email}`
    };
    return;
  }

  const recoveryToken = uuid.v4();

  user.set("recoveryToken", recoveryToken);
  await user.save({ transaction });

  const mailOptions = {
    from: '"Bla-Bla-App" <bla-bla-app@foo-bar.com>',
    to: email,
    subject: "Recovery Password Magic Link",
    html: `
            Ignore this message if you didn't request password recovery
            <a href="${PUBLIC_IP}/${ROUTES_API_VERSION}/${ROUTES_AUTH}/${ROUTES_RECOVERY_PASSWORD}/${recoveryToken}">Click For Recover Password</a>`
  };

  await mailer.sendMail(mailOptions);

  ctx.body = {
    status: "success",
    message: "Recovery instructions were sent to your email"
  }
};
