import Koa from "koa";
import route from "koa-route";

const app = new Koa();

app.use(route.post("/", async (ctx, next) => {
  ctx.body={action: "recovery-password request"};
}));

app.use(route.post("/:recoverToken", async (ctx, next) => {
  ctx.body={action: `recovery-password with token, ${next}`};
}));

export default app;