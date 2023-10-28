import { ModalType } from "~/shared/entities/enum-entity";
import { Filter } from "~/shared/entities/table-option";

export default () => {
    const getStyleIconColor = (modalType:ModalType):string=>{
        const StyleColor = [
            'icon check text-success',
            'icon cross text-danger',
            'icon exclamation text-warning',
            'icon question text-info'
        ]

        return StyleColor[modalType]
    }
    const getStyleColor = (modalType:ModalType):string=>{
        const StyleColor = [
            'text-success',
            'text-danger',
            'text-warning',
            'text-info'
        ]

        return StyleColor[modalType]
    }
    const getStyleButtonColor = (modalType:ModalType):string=>{
        const StyleColor = [
            'btn-primary',
            'btn-danger',
            'btn-warning',
            'btn-gray'
        ]

        return StyleColor[modalType]
    }
    const getOrderType = (id: string): any => {
        const OrderType = {
            C1: {
                title: "ประเภท 3 Campaign",
                text: "ประเภท 3 Campaign",
            },
            C2: {
                title: "ประเภท 3 รถใหญ่",
                text: "ประเภท 3 รถใหญ่",
            },
            M1: {
                title: "ประเภท 1",
                text: "ประเภท 1",
            },
            M2: {
                title: "ประเภท 2",
                text: "ประเภท 2",
            },
            M3: {
                title: "ประเภท 3",
                text: "ประเภท 3",
            },
            M4: {
                title: "ประเภท 4",
                text: "ประเภท 4",
            },
            M5: {
                title: "ประเภท 5",
                text: "ประเภท 5",
            },
            M9: {
                title: "ประเภท 9",
                text: "ประเภท 9",
            },
            MOTC: {
                title: "จักรยานยนต์ (Motor)",
                text: "จักรยานยนต์ (Motor)",
            },
            MPE0: {
                title: "เรตพิเศษ  0",
                text: "เรตพิเศษ  0",
            },
            MPE1: {
                title: "เรตพิเศษ 1",
                text: "เรตพิเศษ 1",
            },
            MPE2: {
                title: "เรตพิเศษ 2",
                text: "เรตพิเศษ 2",
            },
            MPE3: {
                title: "เรตพิเศษ 3",
                text: "เรตพิเศษ 3",
            },
            P: {
                title: "พรบ",
                text: "พรบ",
            },
            P0: {
                title: "พรบ.เรตพิเศษ 0",
                text: "พรบ.เรตพิเศษ 0",
            },
            P1: {
                title: "พรบ.พิเศษ1 (Taxi)",
                text: "พรบ.พิเศษ1 (Taxi)",
            },
            P2: {
                title: "พรบ.มอเตอร์ไซต์",
                text: "พรบ.มอเตอร์ไซต์",
            },
            P3: {
                title: "พรบ.เรตพิเศษ",
                text: "พรบ.เรตพิเศษ",
            },
            P4: {
                title: "พรบ.รถใหญ่",
                text: "พรบ.รถใหญ่",
            },
        };

        return OrderType[id]

    }
    const getOrderClassType = (id: string): any => {
        const OrderClassType = {
            M1C1: {
                title: "ป. 1",
                text: "ประกันชั้น 1",
            },
            M2C1: {
                title: "ป. 2",
                text: "ประกันชั้น 2",
            },
            M3C1: {
                title: "ป. 3",
                text: "ประกันชั้น 3",
            },
            M4C1: {
                title: "ป. 4",
                text: "ประกันชั้น 4",
            },
            M5C1: {
                title: "ป. 5",
                text: "ประกันชั้น 5",
            },
            M5C2: {
                title: "ป. 2+ ต.",
                text: "ประกันชั้น 5 2+ เต็มทุน",
            },
            M5C3: {
                title: "ป. 2+ ธ",
                text: "ประกันชั้น 5 2+ ธรรมดา",
            },
            M5C4: {
                title: "ป. 3+ ต.",
                text: "ประกันชั้น 5 3+ เต็มทุน",
            },
            M5C5: {
                title: "ป. 3+ ธ.",
                text: "ประกันชั้น 5 3+ ธรรมดา",
            },
            M2C2: {
                title: "ป. 2",
                text: "ประกันชั้น 2",
            },
        };

        return OrderClassType[id]
    }
    const getFilterSearchHistory = (searchKey: string,searchValue:string,searchType?:string): Filter[] => {
        const data:Filter[] = [];
        const filterMap = [
            { field: 'OrderNo', type: 'LIKE' },
            { field: 'CreateDate', type: 'DATE_EQ' },//DATE_EQ,DATE_LT,DATE_GT,DATE_LTE,DATE_GTE
            { field: 'OrderGroupType', type: 'MATCH' },
            { field: 'OrderType', type: 'MATCH' },
            { field: 'OrderAmount', type: 'NUM_EQ' },//NUM_EQ,NUM_LT,NUM_GT,NUM_LTE,NUM_GTE
            { field: 'PhoneNumber', type: 'LIKE' },
            { field: 'AssuredFullName', type: 'LIKE' },
            { field: 'Status', type: 'MATCH' },
            { field: 'Status', type: 'LIKE' },
            { field: 'IsDelivery', type: 'LIKE' },
            { field: 'CreateType', type: 'MATCH' },
            { field: 'JobType', type: 'MATCH' },
            { field: 'CreateDate', type: 'DATE_LTE' },
            { field: 'CreateDate', type: 'DATE_GTE' },
        ]
        let filter = filterMap.filter(x => x.field == searchKey)
        if(searchType && searchType!="")
        {
            filter =  filter.filter(x => x.type == searchType)
        }
        if(filter.length>0)
        {
            
            filter.forEach((value,index)=>{
                data.push({
                    field:value.field,
                    type:value.type,
                    value:searchValue
                })
            })
        }   
        return data
    }
   
    return {
        getOrderType,
        getOrderClassType,
        getFilterSearchHistory,
        getStyleColor,
        getStyleButtonColor,
        getStyleIconColor
        // covertQueryStringToJsonHistory,
        // getJsonTableHistory
    }
}