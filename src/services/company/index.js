import Koa from "koa";
import route from "koa-route";
import body from "koa-json-body";
import jwt from "koa-jwt";
import compose from "koa-compose";
import { JSON_MAX_PAYLOAD_SIZE, JWT_SECRET } from "../../config";
import getOne from "./get-one";
import remove from "./remove";
import update from "./update";
import create from "./create";
import addUser from "./add-user";
import removeUser from "./remove-user";
import changeRole from "./change-role";
import leave from "./leave";
import verifyCompanyExistence from "./verify-company-existence";
import verifyUserExistence from "./verify-user-existence";
import verifyRequesterAdminPermissions from "./verify-requester-admin-permissions";
import verifyRequesterEmployeePermissions from "./verify-requester-employee-permissions";
import verifyRequesterIsOwner from "./verify-requester-is-owner";

const app = new Koa();

app.use(jwt({ secret: JWT_SECRET }));
app.use(body({ limit: JSON_MAX_PAYLOAD_SIZE, fallback: true }));

app.use(route.post("/", create));

app.use(route.all("/:id", verifyCompanyExistence));

app.use(route.get("/:id", compose([verifyRequesterEmployeePermissions, getOne])));
app.use(route.del("/:id/leave", compose([verifyRequesterEmployeePermissions, leave])));
app.use(route.del("/:id", compose([verifyRequesterIsOwner, remove])));

app.use(verifyRequesterAdminPermissions);
app.use(route.put("/:id", update));

app.use(route.all("/:id/*/:userId", verifyUserExistence));

app.use(route.post("/:id/add-employee/:userId", addUser));
app.use(route.delete("/:id/remove-employee/:userId", removeUser));
app.use(route.put("/:id/change-employees-role/:userId", changeRole));

export default app;