import Koa from "koa";
import Router from "koa-router";
import mount from "koa-mount";
import body from "koa-json-body";
import loginHandler from "./login";
import recoverPasswordHandler from "./recovery-password";
import { JSON_MAX_PAYLOAD_SIZE } from "../../config";

const app = new Koa();
const router = new Router();

router.post("/login", loginHandler);

app.use(body({ limit: JSON_MAX_PAYLOAD_SIZE, fallback: true }));

app.use(router.routes());
app.use(mount("/recover-password", recoverPasswordHandler));

export default app;
