import Koa from "koa";
import Router from "koa-router";
import requestRecovery from "./request-recovery-password";
import changePassword from "./change-password";

const app = new Koa();
const router = new Router();

router.post("/", requestRecovery);
router.post("/:recoveryToken", changePassword);

app.use(router.routes());

export default app;