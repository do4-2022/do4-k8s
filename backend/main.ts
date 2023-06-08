import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { getCounter, incrementCounter, initDb } from "./db.ts";

const app = new Application();

const router = new Router();

router.get("/status", async (ctx) => {
  const count = await getCounter();

  ctx.response.body = count;
});

router.post("/increment", async (ctx) => {
  const count = await incrementCounter();

  ctx.response.body = count;
});

router.get("/health", async (ctx) => {
  try {
    await getCounter();
    ctx.response.body = "OK";
    ctx.response.status = 200;
  } catch (_err) {
    ctx.response.body = "ERROR";
    ctx.response.status = 500;
  }
});

app.use(router.routes());

await initDb(false);

await app.listen({ port: 3001 });
