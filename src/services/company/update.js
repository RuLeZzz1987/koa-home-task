export default async (ctx, id, next) => {
  ctx.body = {action: `update ${id} one company`};
}