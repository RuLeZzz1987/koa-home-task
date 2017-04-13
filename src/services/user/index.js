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
const router = new Router();

router.use(body({ limit: JSON_MAX_PAYLOAD_SIZE, fallback: true }));
router.post("/", createHandler);
router.use(jwt({ secret: JWT_SECRET }));
router.all("/:id?", verifyRequester);
router.get("/:id", getOneHandler);
router.put("/:id?", updateHandler);
router.del("/:id?", removeHandler);
router.get("/", getListHandler);

app.use(router.routes());

export default app;
