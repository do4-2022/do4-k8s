import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import { Status, getStatus } from "../model/status.ts";

export const handler: Handlers<Status> = {
  async GET(_, ctx) {
    const resp = await getStatus();
    return ctx.render(resp);
  },
};
export default function Home({ data }: PageProps<Status>) {
  return (
    <>
      <Head>
        <title>K8S TP</title>
      </Head>
      <div>
        <h1>Counter</h1>
        <Counter start={data.count} />
      </div>
    </>
  );
}
