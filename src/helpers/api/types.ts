export type ApiResponse<T = unknown> = {
  message: string;
  data: T;
};

export type ApiResponseWithMeta<T = unknown> = ApiResponse<T> & {
  meta: { page: number; perPage: number; total: number };
};

export type ErrorApiResponse = {
  message: string;
  errors?: Record<string, unknown>;
};

export type QueryParams = {
  page?: number;
  limit?: number;
};
