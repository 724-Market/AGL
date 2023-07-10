// export default defineEventHandler(() => {
//     return {
//       siteOnline : 1, 
//       siteOfflineMessage : "ระบบปิดปรับปรุงชั่วคราว", 
//       compulsory : {
//         CoverageExpireDateNotFullYearMinDay : 180, 
//         CoverageExpireDateNotFullYearMaxDay : 545, 
//       }
//     }
//   })

export const defineEventHandler = {
  siteOnline : 1, 
  siteOfflineMessage : "ระบบปิดปรับปรุงชั่วคราว", 
  compulsory : {
    CoverageExpireDateFullYearMaxDay: 365,
    CoverageExpireDateNotFullYearMinDay : 180, 
    CoverageExpireDateNotFullYearMaxDay : 545, 
    CoverageFuture: 90
  },
  defaultMessageError: 'เกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ'
}