import 'source-map-support/register'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse, formatJSONErrorResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { S3Result, getOfficeUtilization } from '../../libs/s3Client'

import schema from './schema'
import { calcUsage, UsageRequest } from 'src/service/usage'

const utilization: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  console.log(`Invoked utilization function with event: ${JSON.stringify(event)}`)

  const org = event.body.org
  const location = event.body.location
  console.log(`org=${org}, location=${location}`)

  const result: S3Result = await getOfficeUtilization()

  if (result instanceof Error) {
    console.log(`Error getting data from S3: ${JSON.stringify(result)}`)
    return formatJSONErrorResponse({
      message: `Error: ${result.message}`,
      event,
    });
  } else {
    const usageRequest: UsageRequest = {org, location }
    const usageReport = calcUsage(usageRequest, result.officeEquipment)
    return formatJSONResponse({
      message: `For org: ${usageReport.org}, location: ${usageReport.location}, utilization is: ${usageReport.used_hours}`,
      event,
    });
  }
}

export const main = middyfy(utilization);
