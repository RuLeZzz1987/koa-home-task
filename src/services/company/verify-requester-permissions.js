export default async (ctx, next) => {
  const { requester } = ctx.state;
  const admins = await ctx.company.getAdmins();
  if (
    !admins.some(admin => admin.id === requester.id) &&
    ctx.company.OwnerId !== requester.id
  ) {
    ctx.transaction.rollback();
    ctx.status = 403;
    ctx.body = {
      status: "error",
      message: "You don't have permissions which allow to change an employees role"
    }
  }

  await next();
}