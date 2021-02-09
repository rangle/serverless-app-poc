# **BiteTut - Headless Serverless Ecommerce POC**

BiteTut is a serverless e-commerce storefront that provides subscription-based online learning content managed by headless CMS.

## **Features**

- Create, manage and publish content with [Contentful](https://www.contentful.com/)
- Manage recurring payments using [Stripe](https://stripe.com)
- Secure user authentication and access control using [AWS Cognito](https://aws.amazon.com/cognito/)
- Highly customizable components with full theming support using [styled-components](https://styled-components.com/docs/advanced#theming)
- Deploy and manage AWS infrastructure to use AWS Lambda functions with the [Serverless Framework](https://www.serverless.com/)

## **Prerequisites**

### Contentful Account

1. sign up for a Contentful account
2. create an empty Space to hold your content
3. set up content model
4. configure the [Contentful Javascript SDK](https://github.com/contentful/contentful.js/#configuration) using your set of the access token and space ID

### Stripe account

1. sign up for a Stripe account
2. obtain the [Stripe API keys](https://stripe.com/docs/keys)

### AWS account

1. sign up for an AWS account
2. create an IAM User and Access Key
3. set up credential [with AWS CLI](https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md#setup-with-the-aws-cli)
