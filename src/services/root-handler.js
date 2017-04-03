export default async function (ctx, next) {
  try {
    await next();
  } catch (e) {
    ctx.throw(500, e.message);
  }
}
