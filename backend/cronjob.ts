import { copyCounter, initDb } from "./db.ts";

await initDb(true);
await copyCounter();
