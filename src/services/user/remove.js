import Sequelize from "sequelize";
import models from "../../models";

const { ForeignKeyConstraintError } = Sequelize;

// TODO add transactions

export default async ctx => {

  const [userId] = ctx.captures;
  const { user } = ctx.state;
  const transaction = await models.sequelize.transaction({ autocommit: false });
  try {
    const adminsCount = await models.User.scope("admin").count({ transaction });

    if (
      adminsCount === 1 &&
      (!userId || userId === user.id) &&
      user.role === "admin"
    ) {
      await transaction.rollback();
      ctx.status = 403;
      ctx.body = {
        status: "error",
        message: "You can not remove the last admin user"
      };
      return;
    }

    await models.User.destroy(
      { where: { id: userId || user.id } },
      { transaction }
    );
    await transaction.commit();
    ctx.body = { status: "success", message: "User account has been removed" };
  } catch (e) {
    await transaction.rollback();
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
