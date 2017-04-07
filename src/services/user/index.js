import Koa from "koa";
import Router from "koa-router";
import body from "koa-json-body";
import jwt from "koa-jwt";
import createHandler from "./create";
import updateHandler from "./update";
import getListHandler from "./get-list";
import removeHandler from "./remove";
import getOneHandler from "./get-one";
import verifyRequester from "./verify-requester-admin-or-self";
import { JWT_SECRET, JSON_MAX_PAYLOAD_SIZE } from "../../config";

const app = new Koa();
const createRoute = new Router();
const otherRoutes = new Router();

app.use(body({ limit: JSON_MAX_PAYLOAD_SIZE, fallback: true }));

createRoute.post("/", createHandler);

app.use(createRoute.routes());

app.use(jwt({ secret: JWT_SECRET }));

otherRoutes.all("/:id", verifyRequester);
otherRoutes.get("/:id", getOneHandler);
otherRoutes.put("/:id", updateHandler);
otherRoutes.del("/:id", removeHandler);
otherRoutes.get("/", getListHandler);

app.use(otherRoutes.routes());

export default app;
