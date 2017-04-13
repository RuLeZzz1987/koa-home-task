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

test("User can remove own company", async t => {
  const user = await request.post("/api/v1/user").send({
    login: "custom 1",
    password: "Qwerty",
    email: "custom-1@mailinator.com"
  });

  const name = "custom comp";

  const company = await request
    .post("/api/v1/company")
    .set("Authorization", `Bearer ${user.body.token}`)
    .send({
      name
    });

  const removeResult = await request
    .delete(`/api/v1/company/${company.body.id}`)
    .set("Authorization", `Bearer ${user.body.token}`);

  t.is(removeResult.statusCode, 200);
  t.pass();
});

test("Admin can remove users company", async t => {
  const user = await request.post("/api/v1/user").send({
    login: "custom 2",
    password: "Qwerty",
    email: "custom-2@mailinator.com"
  });

  const name = "custom comp 2";

  const company = await request
    .post("/api/v1/company")
    .set("Authorization", `Bearer ${user.body.token}`)
    .send({
      name
    });

  const admin = await request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" });

  const removeResult = await request
    .delete(`/api/v1/company/${company.body.id}`)
    .set("Authorization", `Bearer ${admin.body.token}`);

  t.is(removeResult.statusCode, 200);
  t.pass();
});

test("Common user can not remove users company", async t => {
  const owner = await request.post("/api/v1/user").send({
    login: "custom 3",
    password: "Qwerty",
    email: "custom-3@mailinator.com"
  });

  const name = "custom comp 2";

  const company = await request
    .post("/api/v1/company")
    .set("Authorization", `Bearer ${owner.body.token}`)
    .send({
      name
    });

  const user = await request.post("/api/v1/user").send({
    login: "custom 4",
    password: "Qwerty",
    email: "custom-4@mailinator.com"
  });

  const removeResult = await request
    .delete(`/api/v1/company/${company.body.id}`)
    .set("Authorization", `Bearer ${user.body.token}`);

  t.is(removeResult.statusCode, 403);
  t.pass();
});
