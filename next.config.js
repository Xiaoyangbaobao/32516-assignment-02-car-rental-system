
module.exports = {
    images: {
      domains: ['i.ibb.co', 'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com'],
    },
   
  env: {
    EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_KEY,
    EMAIL_PUBLIC_KEY: process.env.EMAIL_PUBLIC_KEY,
    EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_KEY,
    STRIPE_PROMISE_KEY: process.env.STRIPE_PROMISE_KEY,
    DYNAMO_DB_ENDPOINT: process.env.DYNAMO_DB_ENDPOINT,
    DYNAMO_DB_REGION: process.env.DYNAMO_DB_REGION,
    DYNAMO_DB_TABLE_NAME: process.env.DYNAMO_DB_TABLE_NAME,
    AWS_ROLE_ARN: process.env.AWS_ROLE_ARN,
    AWS_WEB_IDENTITY_TOKEN_FILE: process.env.AWS_WEB_IDENTITY_TOKEN_FILE,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY
  }
};
  

