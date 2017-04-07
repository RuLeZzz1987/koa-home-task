import models from "../../models";

export default async (ctx, next) => {
  const [id] = ctx.captures;

  const user = await models.User.findById(id, {
    attributes: ["id", "login", "email", "role"]
  });

  if (!user) {
    ctx.status = 404;
    ctx.body = {
      status: "error",
      message: "Not Found"
    };
    return;
  }

  ctx.body = {
    status: "success",
    user
  };
};
