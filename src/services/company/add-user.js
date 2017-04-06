import _ from "lodash";

export default async (ctx, id, userId, next) => {
  const role = _.get(ctx.request, "body.role", "user");
  const { company, transaction } = ctx;
  const { user } = ctx;

  try {
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
    throw e;
  }
};
