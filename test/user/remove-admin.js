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

test("Can remove admin", async t => {
  const user = await request
    .post("/api/v1/user")
    .send({
      login: "first user",
      email: "first@mailinator.com",
      password: "Qwerty1!"
    });

  const updateUser = await request
    .put("/api/v1/user")
    .set("Authorization", `Bearer ${user.body.token}`);

  const admin = await request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" });

  const setAdmin = await request
    .put(`/api/v1/user/${updateUser.body.user.id}`)
    .set("Authorization", `Bearer ${admin.body.token}`)
    .send({ role: "admin" });

  const removeAdmin = await request
    .delete(`/api/v1/user/${updateUser.body.user.id}`)
    .set("Authorization", `Bearer ${admin.body.token}`);

  t.is(removeAdmin.body.status, "success");
  t.is(removeAdmin.body.message, "User account has been removed");

  t.pass();
});

test.after("cleanup", t => {
  server.close();
});
