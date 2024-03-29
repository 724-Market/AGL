export interface UploadFileRequest {
    Base64: string
    FileNameWithExtension: string
}

export interface UploadFileResponse {
    ID: string
    Path: string
    TempPath: string
    PublishPath: string
    Encode: string
    Origin: string
    Extension: string
    Size: number
}

export interface GetFileResponse {
    Base64: string
    Name: string
    ReferenceID: string
    Extension: string
    Size: number
    Title: string
    Details: string
    CreateDate: string
    UpdateDate: string
}
