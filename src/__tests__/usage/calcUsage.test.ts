import {EquipmentUsageData, UsageRequest, calcUsage} from '../../service/usage'

describe('usage', () => {
    describe('records matched', () => {
        let data: EquipmentUsageData[] = [
            {
                org: "O1",
                location: "L1",
                id: 1,
                type: "Chair",
                usage: {
                    used_hours: 3
                },
            }, {
                org: "O1",
                location: "L1",
                id: 1,
                type: "Chair",
                usage: {
                    used_hours: 4
                },
            }, {
                org: "O1",
                location: "L2",
                id: 1,
                type: "Chair",
                usage: {
                    used_hours: 3
                },  
            }
        ]

        it('should sum up utilization for that record', () => {
            let request: UsageRequest = {
                org: "O1",
                location: "L1"
            }
            expect(calcUsage(request, data)).toEqual({
                org: "O1",
                location: "L1",
                used_hours: 7
            })
        })
        it('should return empty record when no match', () => {
            let request: UsageRequest = {
                org: "O2",
                location: "L1"
            }
            expect(calcUsage(request, data)).toEqual({
                org: "O2",
                location: "L1",
                used_hours: 0
            })
        })
    })
})