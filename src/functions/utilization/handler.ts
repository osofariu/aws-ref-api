import 'source-map-support/register'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse, formatJSONErrorResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { S3Result, getOfficeUtilization } from '../../service/s3Client'

import schema from './schema'

const utilization: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  console.log("Invoked utilization function")
  const result: S3Result = await getOfficeUtilization()

  if (result instanceof Error) {
    console.log(`Error getting data from S3: ${JSON.stringify(result)}`)
    return formatJSONErrorResponse({
      message: `Error: ${result.message}`,
      event,
    });
  } else {
    return formatJSONResponse({
      message: `Got ${result.officeEquipment.length} records from S3`,
      event,
    });
  }
}

export const main = middyfy(utilization);
