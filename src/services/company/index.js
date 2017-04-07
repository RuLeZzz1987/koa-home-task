import Koa from "koa";
import Router from "koa-router";
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
const router = new Router();

app.use(jwt({ secret: JWT_SECRET }));
app.use(body({ limit: JSON_MAX_PAYLOAD_SIZE, fallback: true }));

router.post("/", create);
router.all(["/:id", "/:id/*"], verifyCompanyExistence);
router.get("/:id", compose([verifyRequesterEmployeePermissions, getOne]));
router.del("/:id/leave", compose([verifyRequesterEmployeePermissions, leave]));
router.del("/:id", compose([verifyRequesterIsOwner, remove]));
router.use(verifyRequesterAdminPermissions);
router.put("/:id", update);
router.all("/:id/*/:userId", verifyUserExistence);
router.post("/:id/add-employee/:userId", addUser);
router.del("/:id/remove-employee/:userId", removeUser);
router.put("/:id/change-employees-role/:userId", changeRole);

app.use(router.routes());

export default app;