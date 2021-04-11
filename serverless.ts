import type { AWS } from '@serverless/typescript';

import utilization from '@functions/utilization';

const serverlessConfiguration: AWS = {
  service: 'hm-reference',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['s3:ListBucket'],
            Resource: '*'
          },
          {
            Effect: 'Allow',
            Action: ['s3:GetObject'],
            Resource: '*'
          }
        ],
      }
    },
  },
  functions: { utilization },
  resources: {
    Resources: {
      'UtilizationBucket': {
        Type: 'AWS::S3::Bucket',
        Properties: {
          'BucketName': 'officeequipmentbucket'
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
