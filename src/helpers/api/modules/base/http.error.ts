import { AxiosError } from "axios";
import { ErrorApiResponse } from "../../types";

export class HttpError extends Error {
  public isHttpException = true;
  public name = "HttpException";

  constructor(
    public message: string,
    public status: number,
    public errors: Record<string, unknown>
  ) {
    super(message);
  }

  static parse(error: AxiosError<ErrorApiResponse> | Error) {
    if (error instanceof AxiosError) {
      return new HttpError(
        error?.response?.data?.message || error.message,
        error?.response?.status || 0,
        error?.response?.data?.errors || {}
      );
    }

    return error;
  }
}
