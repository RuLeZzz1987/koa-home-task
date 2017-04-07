import models from "../../models";

export default async (ctx, next) => {
  const [userId] = ctx.captures;
  const { user: requester } = ctx.state;
  const { login, role, email, password } = ctx.request.body;
  if (requester.role !== "admin" && role === "admin") {
    ctx.status = 403;
    ctx.body = {
      status: "error",
      message: "You don't have permissions to grant admin privilege"
    };
    return;
  }

  const transaction = await models.sequelize.transaction();
  const user = await models.User.findById(userId, { transaction });

  if (login) {
    user.set("login", login);
  }

  if (role) {
    const adminsCount = await models.User.scope("admin").count({ transaction });
    if (
      adminsCount === 1 &&
      requester.role === "admin" &&
      user.id === requester.id &&
      role === "user"
    ) {
      ctx.status = 403;
      ctx.body = {
        status: "error",
        message: "You can not remove the last admin user"
      };
      return;
    }
    user.set("role", role);
  }

  if (email) {
    user.set("email", email);
  }

  if (password) {
    user.set("password", password);
  }

  await user.save({ transaction });

  ctx.body = {
    status: "success",
    user: { id: user.id, login: user.login, email: user.email, role: user.role }
  };
};
