import isUUID from "validator/lib/isUUID";
import models from "../../../models";

export default async (ctx, next) => {
  const [recoveryToken] = ctx.captures;
  const { password } = ctx.request.body;

  if (!isUUID(recoveryToken, 4)) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: "Recovery Token should be valid UUID"
    };
    return;
  }

  const transaction = await models.sequelize.transaction();
  const user = await models.User.findOne({ recoveryToken }, { transaction });

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: "Recovery token is invalid"
    };
    return;
  }

  user.set("password", password);
  user.set("recoveryToken", null);
  await user.save({ transaction });

  ctx.body = {
    status: "success",
    message: "Password successfully changed"
  };
};
