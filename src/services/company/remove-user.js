export default async (ctx, id, userId, next) => {
  ctx.body = {action: `remove user ${userId} to ${id} company`};
}