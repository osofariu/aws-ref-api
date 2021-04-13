export type UsageData = {
    used_hours: number
}

export type EquipmentUsageData = {
    org: string,
    location: string,
    id: number,
    type: string,
    usage: UsageData
}

export type UsageRequest = {
    org: string,
    location: string,
    type?: string
}

export type UsageResponse = {
    org: string,
    location: string,
    used_hours: number
}

export function calcUsage(req: UsageRequest, data: EquipmentUsageData[]): UsageResponse {
    const filteredData = data.filter((record) => record.org === req.org && record.location === req.location)
    const totalUsage = filteredData.reduce((acc, val) => {
        return acc + val.usage.used_hours
        }, 0)
    
    const result: UsageResponse = {
        org: req.org,
        location: req.location,
        used_hours: totalUsage
    }
    return result
}