import Sequelize from "sequelize";
import models from "../../models";

const { ForeignKeyConstraintError } = Sequelize;

export default async ctx => {
  const [userId] = ctx.captures;
  const { user } = ctx.state;
  try {
    const transaction = models.sequelize.transaction();
    const adminsCount = models.User.scope("admin").count({ transaction });

    if (adminsCount === 1 && userId === user.id && user.role === "admin") {
      ctx.status = 403;
      ctx.body = {
        status: "error",
        message: "You can not remove the last admin user"
      };
      return;
    }

    await models.User.destroy({ where: { id: user.id } });
    ctx.body = { status: "success", message: "User account has been removed" };
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
