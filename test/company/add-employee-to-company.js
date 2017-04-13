import test from "ava";
import supertest from "supertest";
import sync from "../../src/models/sync";
import app from "../../src/server";

let server;
let request;

test.before(t => sync().then(() => {
  server = app.listen();
  request = supertest(server);
}));

test("Owner can add user to company", async t => {
  const owner = await request.post("/api/v1/user").send({
    login: "custom 1",
    password: "Qwerty",
    email: "custom-1@mailinator.com"
  });

  const user = await request.post("/api/v1/user").send({
    login: "custom 2",
    password: "Qwerty",
    email: "custom-2@mailinator.com"
  });

  const company = await request
    .post("/api/v1/company")
    .set("Authorization", `Bearer ${owner.body.token}`)
    .send({
      name: "custom comp"
    });

  const addUserResult = await request
    .post(`/api/v1/company/${company.body.id}/add-employee/${user.body.id}`)
    .set("Authorization", `Bearer ${owner.body.token}`);

  t.is(addUserResult.statusCode, 200);
  t.pass();
});

test("Owner can add user to company and grant admin permissions", async t => {
  const owner = await request.post("/api/v1/user").send({
    login: "custom 11",
    password: "Qwerty",
    email: "custom-11@mailinator.com"
  });

  const user = await request.post("/api/v1/user").send({
    login: "custom 12",
    password: "Qwerty",
    email: "custom-12@mailinator.com"
  });

  const company = await request
    .post("/api/v1/company")
    .set("Authorization", `Bearer ${owner.body.token}`)
    .send({
      name: "custom comp"
    });

  const addUserResult = await request
    .post(`/api/v1/company/${company.body.id}/add-employee/${user.body.id}`)
    .set("Authorization", `Bearer ${owner.body.token}`);

  const grantResult = await request
    .put(`/api/v1/company/${company.body.id}/change-employees-role/${user.body.id}`)
    .set("Authorization", `Bearer ${owner.body.token}`)
    .send({ role: "admin" });

  t.is(grantResult.statusCode, 200);
  t.pass();
});

test("Common user can not add user or himself to company", async t => {
  const owner = await request.post("/api/v1/user").send({
    login: "custom 3",
    password: "Qwerty",
    email: "custom-3@mailinator.com"
  });

  const user = await request.post("/api/v1/user").send({
    login: "custom 4",
    password: "Qwerty",
    email: "custom-4@mailinator.com"
  });

  const company = await request
    .post("/api/v1/company")
    .set("Authorization", `Bearer ${owner.body.token}`)
    .send({
      name: "custom comp1"
    });

  const addUserResult = await request
    .post(`/api/v1/company/${company.body.id}/add-employee/${user.body.id}`)
    .set("Authorization", `Bearer ${user.body.token}`);

  t.is(addUserResult.statusCode, 403);
  t.pass();
});

test("User can leave company", async t => {
  const owner = await request.post("/api/v1/user").send({
    login: "custom 7",
    password: "Qwerty",
    email: "custom-7@mailinator.com"
  });

  const user = await request.post("/api/v1/user").send({
    login: "custom 8",
    password: "Qwerty",
    email: "custom-8@mailinator.com"
  });

  const company = await request
    .post("/api/v1/company")
    .set("Authorization", `Bearer ${owner.body.token}`)
    .send({
      name: "custom comp"
    });

  const addUserResult = await request
    .post(`/api/v1/company/${company.body.id}/add-employee/${user.body.id}`)
    .set("Authorization", `Bearer ${owner.body.token}`);

  const leaveResult = await request
    .delete(`/api/v1/company/${company.body.id}/leave`)
    .set("Authorization", `Bearer ${user.body.token}`);

  t.is(leaveResult.statusCode, 200);
  t.pass();
});