// TODO how is better split dev/prod/test configuration

export const PORT = process.env.PORT || 3000;

export const ROUTES_API_VERSION = process.env.ROUTES_API_VERSION || "api/v1";
export const ROUTES_AUTH = process.env.ROUTES_AUTH || "auth";
export const ROUTES_RECOVERY_PASSWORD = process.env.ROUTES_RECOVERY_PASSWORD ||
  "recover-password";

export const DB_NAME = process.env.DB_NAME || "koa-home-task";
export const DB_PORT = process.env.DB_PORT || "3306";
export const DB_USER_NAME = process.env.DB_USER_NAME;
export const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_TYPE = process.env.DB_TYPE || "mysql";
export const DB_SYNC_FORCE = process.env.DB_SYNC_FORCE || undefined;
export const DB_ADD_SUPER_ADMIN = process.env.DB_ADD_SUPER_ADMIN || undefined;

export const BCRYPT_SALT_ROUNDS = +process.env.PASSWORD_SALT_ROUNDS || 10;

export const JWT_SECRET = process.env.JWT_SECRET || "kdjf&842kds;2391%#W";
export const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME || "15m";
export const JWT_REFRESH_LIFE_TIME = process.env.JWT_REFRESH_LIFE_TIME || "7d";

export const JSON_MAX_PAYLOAD_SIZE = process.env.JSON_MAX_PAYLOAD_SIZE ||
  "10kb";

export const EMAIL_SERVICE = process.env.EMAIL_SERVICE || "gmail";
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const PUBLIC_IP = process.env.PUBLIC_IP || `http://localhost:${PORT}`;
