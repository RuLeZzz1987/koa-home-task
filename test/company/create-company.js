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

test("User can create company", async t => {
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

  t.is(company.body.name, name);
  t.is(company.body.OwnerId, user.body.id);
  t.pass();
});
