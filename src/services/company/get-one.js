export default async (ctx, id, next) => {
  ctx.body = {action: `get ${id} one company`};
}