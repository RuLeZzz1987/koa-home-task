import Koa from "koa";
import mount from "koa-mount";
import serverApp from "./server";
import { PORT } from "./config";

const app = new Koa();
app.use(mount("/api/v1", serverApp));

app.listen(PORT);
