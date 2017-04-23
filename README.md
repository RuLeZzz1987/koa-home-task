### Koa sample project

#### Configuration

##### Used environment vars

* Server
 * PORT - port server running
 * NODE_ENV - current environment, options: `development`, `production`, `test`
 * ROUTES_API_VERSION - version of the api, default: `api/v1`
 * ROUTES_AUTH - path to auth service, default: `auth`
 * ROUTES_RECOVERY_PASSWORD - path to recovery password route, default: `recover-password`
 * PUBLIC_IP - public ip of the app, default: `http://localhost:{PORT}`

* Email transport
  * EMAIL_SERVICE - used service, default: `gmail`,
  * EMAIL_USER - user email used for auth in transport service
  * EMAIL_PASSWORD - user password for auth in transport service

* Database
  * DB_NAME - database name
  * DB_PORT - database port running, default: "3306"
  * DB_USER_NAME - database user name
  * DB_USER_PASSWORD - database user password
  * DB_HOST - database host name, default: "localhost"
  * DB_TYPE - database type, default: "mysql";
  * DB_SYNC_FORCE - remove existed database and create new one using defined schema
  * DB_ADD_SUPER_ADMIN - add super user with predefined values on application startup
  
* Bcrypt
  * PASSWORD_SALT_ROUNDS - bcrypt password salt rounds
  
* Json Web Token 
  * JWT_SECRET - json web token secret key
  * JWT_LIFE_TIME - json web token life time, default: "15m";
  * JWT_REFRESH_LIFE_TIME - refresh token life time, default: "7d";
  
* Body payload

  * JSON_MAX_PAYLOAD_SIZE - max payload size for `application/json` Content-Type, default: "10kb";