const local = `http://localhost:3000/dev`;

export const STRIPE_SUBSCRIPTION_URL = `${process.env.REACT_APP_SERVICE_ENDPOINT}/subscription`;
export const STRIPE_SUBSCRIPTION_URL_LOCAL = `${local}/subscription`;

export const STRIPE_CUSTOMER_URL = `${process.env.REACT_APP_SERVICE_ENDPOINT}/customer`;
export const STRIPE_CUSTOMER_URL_LOCAL = `${local}/customer`;
