import compose from "koa-compose";
import models from "../../models";
import tokenGenerator from "../helpers/token-generator";

const create = async (ctx, next) => {
  const { login, password, email, passwordConfirmation } = ctx.request.body;
  const user = await models.User.create({ login, password, email, passwordConfirmation });
  ctx.viewUser = {login: user.login, id: user.id, email: user.email};
  ctx.status = 201;
  await next();
};

export default compose([create, tokenGenerator]);