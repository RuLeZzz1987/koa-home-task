import Koa from "koa";
import mount from "koa-mount";
import serverApp from "./server";

const PORT = process.env.PORT || 3000;

const app = new Koa();
app.use(mount("/api/v1", serverApp));

app.listen(PORT);
