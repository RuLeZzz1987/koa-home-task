import models from "../../models";

export default async (ctx, id, rest, next) => {
  ctx.transaction = await models.sequelize.transaction();
  ctx.company = await models.Company.findById(id);
  if (!ctx.company) {
    ctx.status = 404;
    ctx.body = {
      status: "error",
      message: `Can not find company with id ${id}`
    };
    ctx.transaction.rollback();
    return;
  }

  await next();
};
