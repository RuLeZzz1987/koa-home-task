export default async ctx => {
  try {
    const { user: requester } = ctx.state;
    const { company, transaction } = ctx;

    if (company.OwnerId !== requester.id && requester.role !== "admin") {
      ctx.status = 403;
      ctx.body = {
        status: "error",
        message: "Only owner has permissions for dissolving a company"
      };
      return;
    }

    const removedCompany = await company.destroy({ transaction });
    await transaction.commit();

    ctx.body = {
      status: "success",
      message: `Company ${removedCompany.name} was removed`
    };
  } catch (e) {
    throw e;
  }
};
