export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface ApiResponse<T> {
  data?: T;
  status: number;
}

export async function runRequest<BodyType, ReturnType>(
  url: string,
  method: HttpMethod,
  body?: BodyType
): Promise<ApiResponse<ReturnType>> {
  console.log("Calling API: " + url + " with method: " + method);
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then(async (response) => ({
      data: response.status !== 204 ? await response.json() : undefined,
      status: response.status,
    }))
    .catch((error) => {
      console.error(
        `Error calling API: ${url} with method: ${method} (error: ${error})`
      );
      return {
        data: undefined,
        status: -1,
      };
    });
}

export async function runGetRequest<ReturnType>(
  url: string
): Promise<ApiResponse<ReturnType>> {
  return runRequest(url, HttpMethod.GET);
}

export async function runPostRequest<BodyType, ReturnType>(
  url: string,
  body?: BodyType
): Promise<ApiResponse<ReturnType>> {
  return runRequest(url, HttpMethod.POST, body);
}
