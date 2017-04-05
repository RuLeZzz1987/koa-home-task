import models from "../../models";

export default async (ctx, next) => {
  const { user } = ctx.state;
  const result = await models.User.destroy({where: {id: user.id}});
  ctx.body={status: "success", message: "Your account has been removed"};
}