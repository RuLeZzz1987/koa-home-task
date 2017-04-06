import _ from "lodash";
import Sequelize from "sequelize";
import models from "../../models";
import { PermissionsDenied } from "../../helpers/errors";

const { InstanceError } = Sequelize;

export default async (ctx, id, userId, next) => {
  const role = _.get(ctx.request, "body.role", "user");
  const transaction = await models.sequelize.transaction();
  try {
    const { user: requester } = ctx.state;
    const company = await models.Company.findById(id, { transaction });
    if (!company) {
      throw new InstanceError(`Can not find company with provided id ${id}`);
    }
    const admins = await company.getAdmins();
    if (
      !admins.some(admin => admin.id === requester.id) &&
      company.OwnerId !== requester.id
    ) {
      throw new PermissionsDenied(
        "You don't have permissions which allow to add an employee to this company"
      );
    }
    const user = await models.User.findById(userId, { transaction });
    if (!user) {
      throw new InstanceError(`Can not find user with provided id ${userId}`);
    }
    /*
     * search for "// Or by providing a second options.through argument when"
     * http://docs.sequelizejs.com/en/latest/docs/associations/#associating-objects
     * */
    user.Role = {
      role
    };
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
    if (e instanceof PermissionsDenied) {
      ctx.status = 403;
      ctx.body = {
        status: "error",
        message: e.message
      };
      return;
    }

    throw e;
  }
};
