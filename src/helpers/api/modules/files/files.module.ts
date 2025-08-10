import { AxiosInstance } from "axios";
import { BaseModule } from "../base/base.module";
import { ApiResponse } from "../../types";
import { UploadFilePayload } from "./type";

export class FilesModule extends BaseModule {
  constructor($axios: AxiosInstance) {
    super($axios, "/app-admin/files");
  }

  uploadFile(payload: UploadFilePayload) {
    return this.$post<ApiResponse<{ url: string }>>("", payload);
  }
}
