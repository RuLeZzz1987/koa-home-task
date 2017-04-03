import Koa from "koa";
import mount from "koa-mount";
import auth from "./services/auth";
import user from "./services/user";
import rootHandler from "./services/root-handler";

const app = new Koa();

app.use(rootHandler);

app.use(mount("/auth", auth));
app.use(mount("/user", user));

export default app;
