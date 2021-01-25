# BiteTut POC Serverless Application

The BiteTut backend is built using the Serverless Framework, which creates an AWS CloudFormation stack that includes AWS Lambda, Cognito, and SES resources.

## Get Started

- Environment: NodeJS 10.x
- Install the serverless framework - `npm install -g serverless`
- [Configure AWS CLI and set up your AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- Install the dependencies of this repository - `npm install`
- Update the `.env` file with necessary credentials

## Test Locally

Run API Gateway locally

```script
npm run dev
```

Test the function using the serverless `invoke` command

```script
sls invoke local -f [function-name]
```

## Deploy Lambda Functions

```script
npm run deploy
```
