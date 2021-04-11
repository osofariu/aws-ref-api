interface OfficeUtilization {
   officeEquipment: ItemUtilization[] 
}

interface ItemUtilization {
    org: string
    location: string
    id: number
    type: string
    usage: Usage
}

interface Usage {
    used_hours: number
}
