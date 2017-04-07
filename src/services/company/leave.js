export default async ctx => {
  try {
    const { user: requester } = ctx.state;
    const { company } = ctx;

    await company.removeEmployee(requester.id);

    ctx.body = {
      status: "success",
      message: `You left company ${company.name}`
    };

  } catch (e) {
    throw e;
  }
}