import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { getCounter, incrementCounter } from "./db.ts";

const app = new Application();

const router = new Router();

router.get("/status", async () => {
  const count = await getCounter();

  return {
    count,
    alive: true,
  };
});

router.post("/increment", async () => {
  const count = await incrementCounter();

  return {
    count,
    alive: true,
  };
});

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 3001 });
