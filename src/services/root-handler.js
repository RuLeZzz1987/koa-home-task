import Sequelize from "sequelize";

const { ValidationError } = Sequelize;

export default async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e.status === 401) {
      ctx.status = 401;
      ctx.body = { status: "error", message: e.message };
      return;
    }

    if (e instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        status: "error",
        message: e.errors.reduce(
          (errors, error) => ({
            ...errors,
            [error.path]: errors[error.path]
              ? `${errors[error.path]}, ${error.message}`
              : error.message
          }),
          {}
        )
      };
      return;
    }

    ctx.status = 500;
    ctx.body = { status: "error", message: e.message };
  }
};
