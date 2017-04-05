export default async (ctx, id, next) => {
  ctx.body = {action: `remove ${id} one company`};
}