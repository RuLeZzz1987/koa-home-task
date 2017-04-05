import Koa from "koa";
import route from "koa-route";
import mount from "koa-mount";
import loginHandler from "./login";
import recoverPasswordHandler from "./recover-password";

const app = new Koa();

app.use(route.post("/login", loginHandler));
app.use(mount("/recover-password", recoverPasswordHandler));

export default app;