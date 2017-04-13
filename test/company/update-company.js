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

test("Owner can update company", async t => {
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

  const nextName = "next custom";

  const updateResult = await request
    .put(`/api/v1/company/${company.body.id}`)
    .set("Authorization", `Bearer ${user.body.token}`)
    .send({ name: nextName });

  t.is(updateResult.body.company.name, nextName);
  t.pass();
});
