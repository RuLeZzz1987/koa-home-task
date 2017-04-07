export default async (ctx, next) => {
  const { user: requester } = ctx.state;
  const employees = await ctx.company.getEmployees();
  if (
    !employees.some(employee => employee.id === requester.id) &&
    ctx.company.OwnerId !== requester.id
  ) {
    ctx.transaction.rollback();
    ctx.status = 403;
    ctx.body = {
      status: "error",
      message: "You don't have permissions which allow this action"
    };
    return;
  }

  await next();
};
