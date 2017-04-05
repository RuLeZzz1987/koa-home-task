import Sequelize from "sequelize";
import models from "../../models";

const { ForeignKeyConstraintError } = Sequelize;

export default async ctx => {
  const { user } = ctx.state;
  try {
    await models.User.destroy({ where: { id: user.id } });
    ctx.body = { status: "success", message: "Your account has been removed" };
  } catch (e) {
    if (e instanceof ForeignKeyConstraintError) {
      ctx.status = 403;
      ctx.body = {
        status: "error",
        message: "Can not remove user which is the owner of the company"
      };
      return;
    }
    throw e;
  }
};
