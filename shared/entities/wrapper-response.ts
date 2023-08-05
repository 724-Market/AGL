
import { Pagination } from "./packageList-entity"

export interface WrapperResponse<T> {
    Status: string
    Message?: string
    ErrorCode?: string
    ErrorMessage?: string
    Data?: T
    Options?: any
    Pagination?:Pagination
  }
  