export const DB_NAME = process.env.DB_NAME || "koa-home-task";
export const DB_PORT = process.env.PORT || "3306";
export const DB_USEN_NAME = process.env.DB_USEN_NAME || "root";
export const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD || "pro100";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_TYPE = process.env.DB_TYPE || "mysql";

export const BCRYPT_SALT_ROUNDS = +process.env.PASSWORD_SALT_ROUNDS || 10;