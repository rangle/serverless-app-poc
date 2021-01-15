import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const cognitoConfig = {
  region: 'us-east-1',
  UserPoolId: 'us-east-1_NOQiUEbH2',
  ClientId: '45sih9f1pcgg6lutm3rlfcsqgo',
};

export const UserPool = new CognitoUserPool(cognitoConfig);
