import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { UserPool } from './cognito-config';

export const signUp = (signUpOptions) => {
  const { email, password, name } = signUpOptions;
  const attributeEmail = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  });
  const attributeName = new CognitoUserAttribute({
    Name: 'name',
    Value: name,
  });
  return new Promise((resolve, reject) => {
    UserPool.signUp(
      email,
      password,
      [attributeEmail, attributeName],
      null,
      (err, signUpResult) => {
        if (err) {
          reject(err);
        }
        resolve(signUpResult);
      }
    );
  });
};

export const authenticate = async (authOptions) => {
  const { email, password } = authOptions;
  const user = new CognitoUser({
    Pool: UserPool,
    Username: email,
  });
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise((resolve, reject) =>
    user.authenticateUser(authDetails, {
      onFailure: (err) => reject(err),
      onSuccess: (data) => {
        resolve(data);
      },
    })
  );
};

export const getUserAttributes = async (cognitoUser) => {
  return new Promise((resolve, reject) => {
    cognitoUser.getUserAttributes((err, attributes) => {
      if (err) {
        reject(err);
      } else {
        const userAttributes = {};
        for (let attribute of attributes) {
          const { Name, Value } = attribute;
          userAttributes[Name] = Value;
        }
        resolve(userAttributes);
      }
    });
  });
};

export const getUserSession = async (cognitoUser) => {
  return new Promise((resolve, reject) => {
    cognitoUser.getSession(async (err, session) => {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  });
};

export const signOut = () => {
  const user = UserPool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};

export const getAuthUser = () => {
  return new Promise(async (resolve, reject) => {
    const user = UserPool.getCurrentUser();

    if (!user) {
      return;
    }

    try {
      const session = await getUserSession(user);
      const token = session.getIdToken().getJwtToken();
      const authUserId = user.getUsername();
      const attributes = await getUserAttributes(user);

      resolve({
        authUserId,
        attributes,
        token,
      });
    } catch (err) {
      reject(err);
    }
  });
};
