import type { IPackageResponse } from "~/shared/entities/packageList-entity"

export default () => {
    const config = useRuntimeConfig()
    const setDefaultPackageListValue = (list: IPackageResponse[]): IPackageResponse[] => {
        list.forEach((value, index) => {
            if (!value.IsTaxInclude && config.public.FixDefaultPackageTaxInclude=='1') {
                list[index].IsTaxInclude = config.public.FixValuePackageTaxInclude === 'true'
            }
            if (!value.PaperBalance && config.public.FixDefaultPackagePaperBalance=='1') {
                if (value.CompanyCode.toUpperCase().includes('TMW')) {
                    list[index].PaperBalance = 0
                }
                list[index].PaperBalance = parseInt(config.public.FixValuePackagePaperBalance)
            }
        })

        return list

    }

    return {
        setDefaultPackageListValue
    }
}