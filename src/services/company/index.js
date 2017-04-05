import Koa from "koa";
import route from "koa-route";
import body from "koa-json-body";
import jwt from "koa-jwt";
import { JSON_MAX_PAYLOAD_SIZE, JWT_SECRET } from "../../config";
import getOne from "./get-one";
import remove from "./remove";
import update from "./update";
import create from "./create";
import addUser from "./add-user";
import removeUser from "./remove-user";
import changeRole from "./change-role";

const app = new Koa();

app.use(jwt({ secret: JWT_SECRET }));
app.use(body({ limit: JSON_MAX_PAYLOAD_SIZE, fallback: true }));

app.use(route.get("/:id", getOne));
app.use(route.del("/:id", remove));
app.use(route.put("/:id", update));
app.use(route.post("/", create));

app.use(route.post("/:id/add-user/:userId", addUser));
app.use(route.delete("/:id/remove-user/:userId", removeUser));
app.use(route.put("/:id/change-role/:userId", changeRole));

export default app;