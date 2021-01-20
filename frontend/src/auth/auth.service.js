import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { UserPool } from './cognito-config';

const AuthService = {
  signUp: (signUpOptions) => {
    const { email, password, attributeEmail, attributeName } = signUpOptions;
    return new Promise((resolve, reject) => {
      UserPool.signUp(
        email,
        password,
        [attributeEmail, attributeName],
        null,
        (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          }

          console.log(data);
          resolve(data);
        }
      );
    });
  },

  authenticate: async (authOptions) => {
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
  },

  getSession: async () => {
    return new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();

      if (!user) {
        return;
      }

      user.getSession(async (err, session) => {
        if (err) {
          reject(err);
        } else {
          console.log('You have logged in!');

          const attributes = await new Promise((resolve, reject) => {
            user.getUserAttributes((err, attributes) => {
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

          const token = session.getIdToken().getJwtToken();

          resolve({ session, attributes, user, token });
        }
      });
    });
  },

  getUserAttributes: async () => {
    console.log('get attributes');
    return new Promise((resolve, reject) => {
      const cognitoUser = UserPool.getCurrentUser();
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
        } else {
          resolve(attributes);
        }
      });
    });
  },

  logout: () => {
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.logout();
    }
  },
};

export default AuthService;
