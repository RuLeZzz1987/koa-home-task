export default async (ctx, id, userId, next) => {
  ctx.body = {action: `add user ${userId} to ${id} company`};
}