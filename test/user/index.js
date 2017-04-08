import test from "ava";
import supertest from "supertest";
import sync from "../../src/models/sync";
import app from "../../src/server";

let server;
let request;

test.before(t =>
  sync.then(() => {
    server = app.listen();
    request = supertest(server);
  }));

test.cb("Should create user", t => {
  request
    .post("/api/v1/user")
    .send({ login: "first user", password: "Qwerty1!", email: "first@mailinator.com" })
    .expect(res => {
      t.true(!!res.body.refreshToken);
      t.true(!!res.body.token);
      t.is(res.body.status, "success");
      t.pass();
    })
    .end(() => {
      t.end()
    })
});

test.after('cleanup', t => {
  server.close();
});
