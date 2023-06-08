import { Handlers } from "$fresh/server.ts";
import { getStatus } from "../../model/status.ts";

export const handler: Handlers = {
  async GET() {
    try {
      await getStatus();
      return new Response("OK", {
        headers: { "content-type": "text/plain" },
      });
    } catch (e) {
      console.log(e);
      return new Response("ERROR", {
        headers: { "content-type": "text/plain" },
        status: 500,
      });
    }
  },
};
