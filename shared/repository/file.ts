import type { UploadFileRequest, UploadFileResponse, GetFileResponse } from "../entities/file-entity";
import type { IAPIResponse } from "../entities/useApi-response";

class FileModule {
  private RESOURCE = '/Files';

  async upload(req:UploadFileRequest): Promise<IAPIResponse<UploadFileResponse[]>> {
    return await useCallApi().apiRepository<UploadFileResponse[]>(`${this.RESOURCE}/http/upload`, req)
  }
  async get(req: string): Promise<IAPIResponse<GetFileResponse>> {
    return await useCallApi().apiRepository<GetFileResponse>(`${this.RESOURCE}/base64/get?FileID=${req}`, req)
  }
  
}

export default FileModule;