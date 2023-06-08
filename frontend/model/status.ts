export interface Status {
  count: number;
  alive: boolean;
}

const backend = Deno.env.get("BACKEND") || "http://localhost:3001";

export async function getStatus(): Promise<Status> {
  const result = await fetch(`${backend}/status`);
  const json = await result.json();
  return json;
}

export async function increment(): Promise<{ count: number }> {
  const result = await fetch(`${backend}/increment`, { method: "POST" });
  const json = await result.json();
  return json;
}
