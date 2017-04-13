import test from "ava";
import supertest from "supertest";
import sync from "../src/models/sync";
import app from "../src/server";

let server;
let request;

test.before(t =>
  sync().then(() => {
    server = app.listen();
    request = supertest(server);
  }));

test("Get 404 on not found route", async t => {
  const getSmthg = await request
    .get("/some-undefined-route");


  t.is(getSmthg.body.status, "error");
  t.is(getSmthg.statusCode, 404);
  t.is(getSmthg.body.message, "Not Found");
  t.pass();
});
