import models from "../../models";

export default async (ctx, next) => {
  const { login, password, email, passwordConfirmation } = ctx.request.body;
  const user = await models.User.create({login, password, email, passwordConfirmation});
  ctx.body=user;
}