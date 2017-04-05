import models from "../../models";

export default async (ctx, id ,next) => {
  const { user } = ctx.state;
  const result = await models.User.destroy({where: {id: id || user.id}});
  ctx.body={action: "delete user"};
}