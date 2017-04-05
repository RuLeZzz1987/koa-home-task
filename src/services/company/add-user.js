import _ from "lodash";
import Sequelize from "sequelize";
import models from "../../models";

const { InstanceError } = Sequelize;

export default async (ctx, id, userId, next) => {
  const role = _.get(ctx.request, "body.role", "user");
  const transaction = await models.sequelize.transaction();
  try {
    const user = await models.User.findById(userId, { transaction });
    if (!user) {
      throw new InstanceError(`Can not find user with provided id ${userId}`);
    }
    user.Role = {
      role
    };
    const company = await models.Company.findById(id, { transaction });
    if (!company) {
      throw new InstanceError(`Can not find company with provided id ${id}`);
    }
    await company.addEmployee(user, { transaction });
    await transaction.commit();
    ctx.body = {
      status: "success",
      message: `Permissions ${role} were granted to user with name ${user.login}`
    };
  } catch (e) {
    transaction.rollback();
    if (e instanceof InstanceError) {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: e.message
      };
      return;
    }

    throw e;
  }
};
