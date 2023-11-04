export interface ErrorCodeRes{
    ErrorCode:string
    ErrorMessageReplace:ErrorMessageReplace[]
    ErrorMessage:string
    MessageResponse:string
}
export interface  ErrorMessageReplace{
    replaceMessage:string
    toMessage:string
}