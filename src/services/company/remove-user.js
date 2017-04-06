import _ from "lodash";

export default async (ctx, id, userId, next) => {
  const role = _.get(ctx.request, "body.role", "user");
  const { company, transaction } = ctx;
  const { user } = ctx;

  try {

    await company.removeEmployee(user, { transaction });
    await transaction.commit();
    ctx.body = {
      status: "success",
      message: `User with name ${user.login} was removed from the company ${company.name}`
    };
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}