import Koa from "koa";
import route from "koa-route";
import body from "koa-json-body";
import createHandler from "./create";
import updateHandler from "./update";
import getListHandler from "./get-list";
import removeHandler from "./remove";
import getOneHandler from "./get-one";

const app = new Koa();

app.use(route.get("/", getListHandler));
app.use(route.get("/:id", getOneHandler));
app.use(body({ limit: '10kb', fallback: true }));
app.use(route.post("/", createHandler));
app.use(route.put("/", updateHandler));
app.use(route.delete("/", removeHandler));

export default app;