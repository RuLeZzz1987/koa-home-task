import test from "ava";
import supertest from "supertest";
import sync from "../../src/models/sync";
import app from "../../src/server";

let server;
let request;

test.before(t =>
  sync().then(() => {
    server = app.listen();
    request = supertest(server);
  }));

test("Admin can get all users", async t => {
  const admin = await request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" });

  const getAll = await request
    .get("/api/v1/user")
    .set("Authorization", `Bearer ${admin.body.token}`);

  t.is(getAll.body.status, "success");
  t.true(getAll.body.users.some(user => user.login === "admin"));
  t.pass();
});

test("Common user can not get all users", async t => {
  const user = await request
    .post("/api/v1/user")
    .send({
      login: "first user",
      password: "Qwerty1!",
      email: "first@mailinator.com"
    });

  const getAll = await request
    .get("/api/v1/user")
    .set("Authorization", `Bearer ${user.body.token}`);

  t.is(getAll.statusCode, 403);
  t.is(getAll.body.status, "error");
  t.is(getAll.body.message, "Permissions denied");
  t.pass();
});