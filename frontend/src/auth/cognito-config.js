import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const cognitoConfig = {
  region: process.env.REACT_APP_COGNITO_REGION,
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

export const UserPool = new CognitoUserPool(cognitoConfig);
