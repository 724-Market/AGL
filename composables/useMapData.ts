import { ModalType } from "~/shared/entities/enum-entity";
import { ErrorCodeRes, ErrorMessageReplace } from "~/shared/entities/error-entity";
import { Filter } from "~/shared/entities/table-option";

export default () => {
    const getStyleIconColor = (modalType: ModalType): string => {
        const StyleColor = [
            'icon check text-success',
            'icon cross text-danger',
            'icon exclamation text-warning',
            'icon question text-info'
        ]

        return StyleColor[modalType]
    }
    const getStyleColor = (modalType: ModalType): string => {
        const StyleColor = [
            'text-success',
            'text-danger',
            'text-warning',
            'text-info'
        ]

        return StyleColor[modalType]
    }
    const getStyleButtonColor = (modalType: ModalType): string => {
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
    const getFilterSearchHistory = (searchKey: string, searchValue: string, searchType?: string): Filter[] => {
        const data: Filter[] = [];
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
        if (searchType && searchType != "") {
            filter = filter.filter(x => x.type == searchType)
        }
        if (filter.length > 0) {

            filter.forEach((value, index) => {
                data.push({
                    field: value.field,
                    type: value.type,
                    value: searchValue
                })
            })
        }
        return data
    }
    const mappingMessageError = (errorCode: string, errorMessage: string, options?: string): ErrorCodeRes => {
        // add mapping error Code Message here
        const data: ErrorCodeRes[] = [
            {
                ErrorCode: "90000999",
                ErrorMessageReplace: [
                    {
                        replaceMessage: "Paper quantity between",
                        toMessage: "จำนวนกระดาษให้กรอกอยู่ในช่วง"
                    },
                    {
                        replaceMessage: "\\[1\\]",
                        toMessage: ""
                    },
                ],
                ErrorMessage: "Paper quantity between 1 - 100. [1]",
                MessageResponse: "@0",
            },
            {
                ErrorCode: "3502999",
                ErrorMessageReplace: [{
                    replaceMessage: "Paper quantity must more than 0. \\[1\\]",
                    toMessage: "ปริมาณกระดาษต้องมากกว่า 0"
                },
                ],
                ErrorMessage: "Paper quantity must more than 0. [1]",
                MessageResponse: "@0",
            },
            {
                ErrorCode: "3501999",
                ErrorMessageReplace: [
                    {
                        replaceMessage: "Insufficient balance. Request",
                        toMessage: "ยอดเงินคงเหลือไม่พอ ต้องการ"
                    },
                    {
                        replaceMessage: "/ Available",
                        toMessage: " บาท คงเหลือ"
                    }],
                ErrorMessage: "Insufficient balance. Request 1000.000/ Available 71.69",
                MessageResponse: "@0 บาท",
            },
            {
                ErrorCode: "3501999",
                ErrorMessageReplace: [
                    {
                        replaceMessage: "Product hold error. Insufficient product stock. Request",
                        toMessage: "จำนวนกระดาษในสต๊อกไม่เพียงพอ ต้องการ"
                    },
                    {
                        replaceMessage: "/ Available",
                        toMessage: " บาท คงเหลือ"
                    }],
                ErrorMessage: "Product hold error. Insufficient product stock. Request 22.0/ Available 20.00",
                MessageResponse: "@0 บาท",
                option: "OUT_OF_STOCK"
            }]
        // filter error code from api response
        const item = data.filter(x => x.ErrorCode === errorCode && (!options || (options && x.option === options)))
        let response: ErrorCodeRes = {
            ErrorCode: errorCode,
            ErrorMessage: "",
            ErrorMessageReplace: [],
            MessageResponse: errorMessage
        }
        let message = errorMessage;
        if (item.length > 0) {
            // replace message from ErrorMessageReplace
            const textReplace = replaceMessageError(errorMessage, item[0].ErrorMessageReplace)
            // response message error to text replace
            message = item[0].MessageResponse.replaceAll(new RegExp('@0', 'gi'), textReplace)
            item[0].MessageResponse = message
            response = item[0]
        }

        return response;
    }
    const replaceMessageError = (message: string, replaces: ErrorMessageReplace[]): string => {
        let text = message;
        for (let i = 0; i < replaces.length; i++) {
            const reg = new RegExp(replaces[i].replaceMessage, 'gi')
            text = text.replaceAll(reg, replaces[i].toMessage);
        }
        return text;
    }

    return {
        getOrderType,
        getOrderClassType,
        getFilterSearchHistory,
        getStyleColor,
        getStyleButtonColor,
        getStyleIconColor,
        mappingMessageError
        // covertQueryStringToJsonHistory,
        // getJsonTableHistory
    }
}