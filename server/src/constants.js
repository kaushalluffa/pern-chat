import dotenv from "dotenv";
dotenv.config();

export const BASE_URL = process.env.BASE_URL;
export const PORT = process.env.PORT || 8000;
export const COMPLETE_URL = `${BASE_URL}:${PORT}`;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const CLIENT_URL = process.env.CLIENT_URL;
export const VALIDATION_MSGS = {
  NO_EMAIL: "NO EMAIL PROVIDED",
  NO_PASSWORD: "NO PASSWORD PROVIDED",
  NO_TOKEN: "NO TOKEN PROVIDED",
  NO_NAME: "NO NAME PROVIDED",
  VALIDATED: "VALIDATED",
};
export const VALIDATION_TYPES = {
  SIGNUP_REQ: "signupReq",
  LOGIN_REQ: "loginReq",
};
export const CLIENT_AUTH_URL = process.env.CLIENT_AUTH_URL;
export const IMAGE_KIT_URL_ENDPOINT = process.env.IMAGE_KIT_URL_ENDPOINT;
export const IMAGE_KIT_PUBLIC_KEY = process.env.IMAGE_KIT_PUBLIC_KEY;
export const IMAGE_KIT_PRIVATE_KEY = process.env.IMAGE_KIT_PRIVATE_KEY;
export const BASE_CLIENT_URL = process.env.BASE_CLIENT_URL;
export const NODE_ENV = process.env.NODE_ENV;
