import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_LIFE_TIME, JWT_REFRESH_LIFE_TIME } from "../../config";

export default async ctx => {
  const token = jwt.sign(ctx.viewUser, JWT_SECRET, {expiresIn: JWT_LIFE_TIME});
  const refreshToken = jwt.sign(ctx.viewUser, JWT_SECRET, {expiresIn: JWT_REFRESH_LIFE_TIME});
  ctx.body= {status: "success", token, refreshToken};
}