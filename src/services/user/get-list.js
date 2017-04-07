import models from "../../models";

// TODO stream result

export default async (ctx, next) => {
  const {user:requester} = ctx.state;
  if (requester.role !== "admin") {
    ctx.status = 403;
    ctx.body = {
      status: "error",
      message: "Permissions denied"
    };
    return;
  }

  const users = await models.User.findAll({
    attributes: ["id", "login", "email", "role"]
  });

  ctx.body = {
    status: "success",
    users
  }

}