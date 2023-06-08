import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { connect } from "https://deno.land/x/redis@v0.29.4/mod.ts";

interface Status {
  count: number;
  alive: boolean;
}

const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379,
});

const postgresUrl =
  Deno.env.get("POSTGRES_URL") ??
  "postgres://postgres:postgres@localhost:5432/postgres";

let client: Client | undefined;

async function initDb() {
  try {
    client = new Client(postgresUrl);
    await client.connect();
    // create the table if it does not exist
    await client.queryArray(
      "CREATE TABLE IF NOT EXISTS counter (  id SERIAL PRIMARY KEY,  count INTEGER NOT NULL"
    );
    await client.queryArray(
      "INSERT INTO my_table (id, count) VALUES (0, 0) ON CONFLICT (id) DO NOTHING;"
    );
  } catch (err) {
    console.log(err);
    client = undefined;
  }
}
async function checkDb() {
  while (true) {
    if (!client || !client.connected) {
      await initDb();
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
await initDb();

async function getRedisCount(): Promise<number> {
  return parseInt((await redis.get("count"))?.toString() ?? "0");
}

export async function getCounter(): Promise<Status> {
  let count = await getRedisCount();

  let alive = false;

  if (client) {
    try {
      const result = await client.queryArray(
        "SELECT count FROM counter WHERE id = 0"
      );
      count = result.rows[0][0] as number;
      alive = true;
    } catch (err) {
      console.log(err);
      client = undefined;
    }
  }
  return {
    count,
    alive,
  };
}

export async function copyCounter() {
  const count = await getRedisCount();

  if (client) {
    try {
      await client.queryArray("UPDATE counter SET count = $1 WHERE id = 0", [
        count,
      ]);
    } catch (err) {
      console.log(err);
      client = undefined;
    }
  } else {
    throw new Error("No client");
  }
}

export async function incrementCounter(): Promise<{ count: number }> {
  let count = await getRedisCount();
  // update redis
  count = parseInt(await redis.set("count", count + 1));

  return {
    count,
  };
}
