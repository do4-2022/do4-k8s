import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { type ApiResponse } from "~/api";
import { incrementCounter } from "~/api/counter";
import { getCounter } from "~/api/counter";

export async function loader(): Promise<ApiResponse<number>> {
  return getCounter();
}

export async function action() {
  return incrementCounter();
}

export default function Counter() {
  const { data } = useLoaderData<typeof loader>();
  const { state } = useNavigation();

  return (
    <div>
      <Form method="post">
        <p>State: {state}</p>
        {state !== "loading" && <p>Counter: {data}</p>}
        {state !== "submitting" && <button type="submit">Increment</button>}
      </Form>
    </div>
  );
}
