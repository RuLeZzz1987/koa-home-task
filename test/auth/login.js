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

test.cb("Should successfully login", t => {
  request
    .post("/api/v1/auth/login")
    .send({ login: "admin", password: "Adm1n!" })
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

test.cb("Should failed login", t => {
  request
    .post("/api/v1/auth/login")
    .send({ login: "unknown", password: "Adm1n!" })
    .expect(401)
    .expect('Content-Type', /json/)
    .end(() => {
      t.end()
    })
});

test.after('cleanup', t => {
  server.close();
});
