import { type ApiResponse, runGetRequest, runPostRequest } from ".";

export const COUNTER_API_PATH =
  process.env.COUNTER_API_URL || "http://localhost:3001";

export interface CounterUpdate {
  value: number;
}

export async function getCounter(): Promise<ApiResponse<number>> {
  return runGetRequest<number>(`${COUNTER_API_PATH}/api/counter`);
}

export async function incrementCounter(): Promise<ApiResponse<number>> {
  return runPostRequest<CounterUpdate, number>(
    `${COUNTER_API_PATH}/api/counter/increment`,
    {
      value: 1,
    }
  );
}
