import Koa from "koa";
import route from "koa-route";
import body from "koa-json-body";
import jwt from "koa-jwt";
import createHandler from "./create";
import updateHandler from "./update";
import getListHandler from "./get-list";
import removeHandler from "./remove";
import getOneHandler from "./get-one";
import { JWT_SECRET, JSON_MAX_PAYLOAD_SIZE } from "../../config";

const app = new Koa();

app.use(body({ limit: JSON_MAX_PAYLOAD_SIZE, fallback: true }));

app.use(route.post("/", createHandler));

app.use(jwt({ secret: JWT_SECRET }));

app.use(route.get("/", getListHandler));
app.use(route.get("/:id", getOneHandler));
app.use(route.put("/:id?", updateHandler));
app.use(route.delete("/:id?", removeHandler));

export default app;
