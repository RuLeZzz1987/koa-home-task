### Koa sample project

#### Configuration

##### Used environment vars


* Database
  * DB_NAME - database name
  * DB_PORT - database port running, default: "3306"
  * DB_USER_NAME - database user name
  * DB_USER_PASSWORD - database user password
  * DB_HOST - database host name, default: "localhost"
  * DB_TYPE - database type, default: "mysql";

* Bcrypt

  * PASSWORD_SALT_ROUNDS - bcrypt password salt rounds
  
* Json Web Token
  
  * JWT_SECRET - json web token secret key
  * JWT_LIFE_TIME - json web token life time, default: "15m";
  * JWT_REFRESH_LIFE_TIME - refresh token life time, default: "7d";
  
* Body payload

  * JSON_MAX_PAYLOAD_SIZE - max payload size for `application/json` Content-Type, default: "10kb";