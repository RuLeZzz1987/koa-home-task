import Koa from "koa";
import mount from "koa-mount";
import route from "koa-route";
import auth from "./services/auth";
import user from "./services/user";
import company from "./services/company";
import rootHandler from "./services/root-handler";
import notFound from "./services/not-found";
import { ROUTES_API_VERSION, ROUTES_AUTH } from "./config"

const app = new Koa();

app.use(rootHandler);

app.use(mount(`/${ROUTES_AUTH}`, auth));
app.use(mount("/user", user));
app.use(mount("/company", company));

const server = new Koa();
server.use(mount(`/${ROUTES_API_VERSION}`, app));
server.use(route.all("/*", notFound));

export default server;
