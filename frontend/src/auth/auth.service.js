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

  signIn: async (signInOptions) => {
    const { email, password } = signInOptions;
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
          console.log(data);
          resolve(data);
        },
      })
    );
  },
};

export default AuthService;
