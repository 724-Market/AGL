export interface AreaListResponse {
    ID: string;
    Name: string;
}

export interface WarehouseAreaListReq {
    AreaID: string;
    Type: string;
}
export interface WarehouseAreaListRes {
    ID: string;
    Name: string;
    AreaID: string;
    AreaName: string;
    Type: string;
}