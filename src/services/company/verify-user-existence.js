import models from "../../models";

export default async (ctx, id, urlPath, userId, next) => {
  const { transaction } = ctx;
  const user = await models.User.findById(userId, { transaction });
  if (!user) {
    ctx.transaction.rollback();
    ctx.status = 404;
    ctx.body = {
      status: "error",
      message: `Can not find user with provided id ${userId}`
    };
    return;
  }

  ctx.user = user;

  await next();
};
