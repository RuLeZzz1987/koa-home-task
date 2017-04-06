import models from "../../models";

export default async (ctx, id, next) => {
  try {
    const { user: requester } = ctx.state;
    const { company } = ctx;

    if (company.OwnerId !== requester.id) {
      ctx.status = 403;
      ctx.body = {
        status: "error",
        message: "Only owner has permissions for dissolving a company"
      };
      return;
    }

    const removedCompany = await company.destroy();

    ctx.body = {
      status: "success",
      message: `Company ${removedCompany.name} was removed`
    };

  } catch (e) {
    throw e;
  }
};
