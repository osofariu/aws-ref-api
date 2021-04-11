'use strict';

import { S3 } from 'aws-sdk'
import AWS from 'aws-sdk';

export type S3Result = Error | OfficeUtilization

export async function getOfficeUtilization(): Promise<S3Result> {
    const s3Params: S3.GetObjectRequest = {
        Bucket: 'officeequipmentbucket',
        Key: 'equipment_usage.json'
      }; 
      
    return s3GetJsonObject(s3Params);                                              
}

async function s3GetJsonObject(params: S3.GetObjectRequest): Promise<S3Result> {
    let s3 = new AWS.S3()
    let data = null

    try {
        data = await s3.getObject(params).promise()
    } catch(error) {
        return Error("500 - could not read data from S3 bucket")
    } 

    if (data?.Body) {
        const resBody = data.Body.toString('utf-8')
        try {
            return JSON.parse(resBody)
        } catch (error) {
            return Error('500 - could not parse data as JSON')
        }
    } else {
        return Error('500 - did not receive a response body')
    }
}