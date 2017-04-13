import compose from "koa-compose";
import models from "../../models";
import tokenGenerator from "../helpers/token-generator";

const create = async (ctx, next) => {
  const { login, password, email } = ctx.request.body;
  const user = await models.User.create({ login, password, email });
  ctx.viewUser = {login: user.login, id: user.id, email: user.email, role: user.role};
  ctx.status = 201;
  await next();
};

export default compose([create, tokenGenerator]);