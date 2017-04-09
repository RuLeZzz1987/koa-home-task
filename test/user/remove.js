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

test("Can not remove the last admin", async t => {
  const admin = await request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" });

  const removeAdmin = await request
    .delete("/api/v1/user")
    .set("Authorization", `Bearer ${admin.body.token}`);

  t.is(removeAdmin.body.status, "error");
  t.is(removeAdmin.statusCode, 403);
  t.pass();
});

test("Can not remove company owner", async t => {
  const user = await request.post("/api/v1/user").send({
    login: "seventh user",
    email: "seventh@mailinator.com",
    password: "Qwerty1!"
  });

  const updatedUser = await request
    .put("/api/v1/user")
    .set("Authorization", `Bearer ${user.body.token}`);

  const company = await request
    .post("/api/v1/company")
    .set("Authorization", `Bearer ${user.body.token}`)
    .send({ name: "first company" });

  const { id } = updatedUser.body.user;

  const admin = await request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" });

  const removeUser = await request
    .delete(`/api/v1/user/${id}`)
    .set("Authorization", `Bearer ${admin.body.token}`);

  t.is(removeUser.body.status, "error");
  t.is(removeUser.statusCode, 403);
  t.pass();
});

test.after("cleanup", t => {
  server.close();
});
