import { Handlers } from "$fresh/server.ts";
import { increment } from "../../model/status.ts";

export const handler: Handlers = {
  async POST() {
    const status = await increment();
    return new Response(JSON.stringify(status), {
      headers: { "content-type": "application/json" },
    });
  },
};
