
// TODO how is better split dev/prod/test configuration

export const PORT = process.env.PORT || 3000;

export const DB_NAME = process.env.DB_NAME || "koa-home-task";
export const DB_PORT = process.env.DB_PORT || "3306";
export const DB_USER_NAME = process.env.DB_USER_NAME || "root";
export const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD || "pro100";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_TYPE = process.env.DB_TYPE || "mysql";

export const BCRYPT_SALT_ROUNDS = +process.env.PASSWORD_SALT_ROUNDS || 10;

export const JWT_SECRET = process.env.JWT_SECRET || "kdjf&842kds;2391%#W";
export const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME || "15m";
export const JWT_REFRESH_LIFE_TIME = process.env.JWT_REFRESH_LIFE_TIME || "7d";

export const JSON_MAX_PAYLOAD_SIZE = process.env.JSON_MAX_PAYLOAD_SIZE || "10kb";