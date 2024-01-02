export interface TrackOrderReq {
    ReferenceID: string
}
export interface TrackOrderRes {
    Parent?: Parent;
    Child?: Child[];
    IsCurrent: boolean;
}

export interface Parent {
    ID: string;
    ApplicationID: string;
    ServiceID: string;
    Type: string;
    Method: string;
    Name: string;
    NameEn: string;
    TrackDate: string;
    Sequence: number;
    GroupCss: string;
    IconCss: string;
    IconImage: string;
}
  
export interface Child {
    ID: string;
    OwnerID: string;
    ReferenceID: string;
    ReferenceType: string;
    FullText: string;
    TrackDate: string;
    Type: string;
    StatusCode: string;
    StatusText: string;
    GroupCss: string;
    IconCss: string;
    IconImage: string;
}