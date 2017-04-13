export default async ctx => {
  const { name } = ctx.request.body;

  if (!name) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: "Name can not be empty"
    };
    return;
  }

  const { transaction } =ctx;
  const company = await ctx.company.update({ name }, { transaction } );

  ctx.body = {status: "success", company};
}