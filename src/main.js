import sync from "./models/sync";
import app from "./server";
import { PORT } from "./config";

const startTime = Date.now();

sync().then(() => {
  app.listen(
    PORT,
    () => global.console.log(`Server listening ${PORT}. Started in ${Date.now() - startTime}ms`)
  );
});
