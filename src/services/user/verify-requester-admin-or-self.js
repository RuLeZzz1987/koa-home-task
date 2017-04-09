export default async (ctx, next) => {
  const { user: requester } = ctx.state;
  const [userId] = ctx.captures;
  if (requester.role === "admin" || requester.id === userId || !userId) {
    await next();
  } else {
    ctx.status = 403;
    ctx.body = {
      status: "error",
      message: "Permissions denied"
    }
  }
}