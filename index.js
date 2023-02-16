import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";

import routes from "./src/routes/crmRoutes";

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/CRMdb", {
  useNewUrlParser: true,
});

// body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setup JWT
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verfiy(
      req.headers.authorization.split(" ")[1],
      "Password",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

app.get("/", (req, res) =>
  res.send(`Node and express server is running on PORT ${PORT}`)
);

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
