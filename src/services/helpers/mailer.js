import Nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_SERVICE, EMAIL_USER } from "../../config";

const transport = Nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
});

transport.sendMail = new Proxy(transport.sendMail, {
  apply: (target, thisArgs, argumentsList) =>
    new Promise((ok, fail) =>
      target.apply(thisArgs, argumentsList.concat((err, info) => err ? fail(err) : ok(info))))
});

export default transport;