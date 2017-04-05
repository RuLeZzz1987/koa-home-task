export default async (ctx, id, userId, next) => {
  ctx.body = {action: `change user ${userId} role into company ${id}`};
}