import models from "../../models";

export default async (ctx, next) => {
  const { transaction } = ctx;
  const [id, route, userId] = ctx.captures;
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
