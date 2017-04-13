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

test("Get 404 if user missing", async t => {
  const admin = await request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" });

  const getOne = await request
    .get("/api/v1/user/unknown-id")
    .set("Authorization", `Bearer ${admin.body.token}`);

  t.is(getOne.body.status, "error");
  t.is(getOne.statusCode, 404);
  t.is(getOne.body.message, "Not Found");
  t.pass();
});

test("Can get single user", async t => {
  const admin = await request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" });
  const user = await request
    .post("/api/v1/user")
    .send({
      login: "first user",
      password: "Qwerty1!",
      email: "first@mailinator.com"
    });

  const getOne = await request
    .get(`/api/v1/user/${user.body.id}`)
    .set("Authorization", `Bearer ${admin.body.token}`);

  t.is(getOne.body.status, "success");
  t.true(!!getOne.body.user);
  t.pass();
});