import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpError } from "./http.error";

export class BaseModule {
  private $axios: AxiosInstance;

  constructor($axios: AxiosInstance, protected readonly baseURL = "") {
    this.$axios = $axios;
  }

  private getUrl(url: string) {
    return this.baseURL + url;
  }

  protected async $request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await axios(config);

      return data as T;
    } catch (error) {
      throw HttpError.parse(error as AxiosError);
    }
  }

  protected async $get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await this.$axios.get(this.getUrl(url), config);

      return data as T;
    } catch (error) {
      throw HttpError.parse(error as AxiosError);
    }
  }

  protected async $put<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await this.$axios.put(this.getUrl(url), body, config);

      return data as T;
    } catch (error) {
      throw HttpError.parse(error as AxiosError);
    }
  }

  protected async $post<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await this.$axios.post(this.getUrl(url), body, config);

      return data as T;
    } catch (error) {
      throw HttpError.parse(error as AxiosError);
    }
  }

  protected async $delete<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data: d } = await this.$axios.delete(this.getUrl(url), {
        data,
        ...(config || {}),
      });

      return d as T;
    } catch (error) {
      throw HttpError.parse(error as AxiosError);
    }
  }
}
