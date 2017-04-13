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

test("Owner or admin can remove employee from company", async t => {
  const owner = await request.post("/api/v1/user").send({
    login: "custom 1",
    password: "Qwerty",
    email: "custom-1@mailinator.com"
  });

  const user = await request.post("/api/v1/user").send({
    login: "custom 2",
    password: "Qwerty",
    email: "custom-5@mailinator.com"
  });

  const name = "custom comp";

  const company = await request
    .post("/api/v1/company")
    .set("Authorization", `Bearer ${owner.body.token}`)
    .send({
      name
    });

  const addUserResult = await request
    .post(`/api/v1/company/${company.body.id}/add-employee/${user.body.id}`)
    .set("Authorization", `Bearer ${owner.body.token}`);

  t.is(addUserResult.statusCode, 200);

  const removeResult = await request
    .delete(
      `/api/v1/company/${company.body.id}/remove-employee/${user.body.id}`
    )
    .set("Authorization", `Bearer ${owner.body.token}`);

  t.is(removeResult.statusCode, 200);
  t.pass();
});
