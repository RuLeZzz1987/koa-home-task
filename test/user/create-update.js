import test from "ava";
import supertest from "supertest";
import sync from "../../src/models/sync";
import app from "../../src/server";

let server;
let request;

test.before(async t =>
   sync().then(() => {
    server = app.listen();
    request = supertest(server);
  }));

test.cb("Should create user", t => {
  request
    .post("/api/v1/user")
    .send({
      login: "first user",
      password: "Qwerty1!",
      email: "first@mailinator.com"
    })
    .expect(res => {
      t.true(!!res.body.refreshToken);
      t.true(!!res.body.token);
      t.is(res.body.status, "success");
      t.pass();
    })
    .end(() => {
      t.end();
    });
});

test("Should fail to create user", async t => {
  const res = await request.post("/api/v1/user").send({});

  t.is(res.statusCode, 400);
  t.is(res.body.message.email, "Provided value is not valid email address");
  t.is(res.body.message.login, "login cannot be null");
  t.is(res.body.message.password, "password cannot be null");
  t.pass();
});

test("Should update user", async t => {
  const user = await request.post("/api/v1/user").send({
    login: "second user1",
    password: "Qwerty1!",
    email: "second1@mailinator.com"
  });

  const email = "second-upd@mailinator.com";
  const login = "second user upd";
  const password = "Pass1Word!";

  const updateResp = await request
    .put("/api/v1/user")
    .set("Authorization", `Bearer ${user.body.token}`)
    .send({
      login,
      email,
      password
    });

  t.is(updateResp.body.status, "success");
  t.is(updateResp.body.user.email, email);
  t.is(updateResp.body.user.login, login);
  t.pass();
});

test("User can not become an admin user by himself", async t => {
  const user = await request.post("/api/v1/user").send({
    role: "admin",
    login: "third",
    password: "Qwerty1!",
    email: "third@mailinator.com"
  });

  const role = "admin";

  const updateResp = await request
    .put("/api/v1/user")
    .set("Authorization", `Bearer ${user.body.token}`)
    .send({
      role
    });

  t.is(updateResp.body.status, "error");
  t.is(
    updateResp.body.message,
    "You don't have permissions to grant admin privilege"
  );
  t.pass();
});

test("The last admin can not make suicide", async t => {
  const admin = await request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" });

  const updateResult = await request
    .put("/api/v1/user")
    .set("Authorization", `Bearer ${admin.body.token}`)
    .send({ role: "user" });

  t.is(updateResult.body.status, "error");
  t.is(updateResult.body.message, "You can not remove the last admin user");

  t.pass();
});

test("Admin can make other user admin", async t => {
  const user = await request.post("/api/v1/user").send({
    login: "fourth login",
    email: "fourth@mailinator.com",
    password: "Qwerty1!"
  });

  const updatedUser = await request
    .put("/api/v1/user")
    .set("Authorization", `Bearer ${user.body.token}`);

  const admin = await request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" });

  const setUserAdmin = await request
    .put(`/api/v1/user/${updatedUser.body.user.id}`)
    .set("Authorization", `Bearer ${admin.body.token}`)
    .send({ role: "admin" });

  t.is(setUserAdmin.body.status, "success");
  t.is(setUserAdmin.body.user.role, "admin");
  t.pass();
});

test("User can not manipulate other user", async t => {
  const user = await request.post("/api/v1/user").send({
    login: "fifth login",
    email: "fifth@mailinator.com",
    password: "Qwerty1!"
  });

  const user2 = await request.post("/api/v1/user").send({
    login: "six login",
    email: "six@mailinator.com",
    password: "Qwerty1!"
  });

  const updatedUser2 = await request
    .put("/api/v1/user")
    .set("Authorization", `Bearer ${user2.body.token}`);

  const attemptToUpdate = await request.put(`/api/v1/user/${updatedUser2.body.user.id}`)
    .set("Authorization", `Bearer ${user.body.token}`)
    .send({role: "admin"});

  t.is(attemptToUpdate.statusCode, 403);
  t.is(attemptToUpdate.body.message, "Permissions denied");
  t.pass();
});

test.after("cleanup", t => {
  server.close();
});
