import Sequelize from "sequelize";
import compose from "koa-compose";
import bcrypt from "bcrypt";
import models from "../../models";
import tokenGenerator from "../helpers/token-generator";

const loginHandler = async (ctx, next) => {
  const { login, password } = ctx.request.body;
  const user = await models.User.findOne({
    where: {
      $or: [
        Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("login")),
          Sequelize.fn("lower", login)
        ),
        Sequelize.where(
          Sequelize.fn("lower", Sequelize.col("email")),
          Sequelize.fn("lower", login)
        )
      ]
    }
  });
  if (!user) {
    ctx.throw(401, "Authentication Error");
  }

  const passwordVerificationResult = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordVerificationResult) {
    ctx.throw(401, "Authentication Error");
  }

  ctx.viewUser = { login: user.login, id: user.id, email: user.email };
  next();
};

export default compose([loginHandler, tokenGenerator]);
