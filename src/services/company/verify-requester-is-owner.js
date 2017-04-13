export default async (ctx, next) => {
  const { user: requester } = ctx.state;
  if (ctx.company.OwnerId !== requester.id && requester.role !== "admin") {
    ctx.transaction.rollback();
    ctx.status = 403;
    ctx.body = {
      status: "error",
      message: "Only owner permits to do this action"
    };
    return;
  }

  await next();
};
