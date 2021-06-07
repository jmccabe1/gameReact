const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "pailbucket",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://z554mr5dal.execute-api.us-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Cu7Ka7RkR",
    APP_CLIENT_ID: "3p86l092630rf71gthqebvdk9n",
    IDENTITY_POOL_ID: "us-east-1:5b98629f-8e82-4933-a0d8-a0c71b6e5474",
  },
};

export default config;