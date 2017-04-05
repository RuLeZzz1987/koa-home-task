import models from "../../models";

export default async ctx => {
  const { name } = ctx.request.body;
  ctx.body = await models.Company.create({
    name,
    OwnerId: ctx.state.user.id
  });
}