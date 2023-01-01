const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const tokenValidator = require("./Middleware/tokenValidator");
const errorUtil = require("./Utils/error");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", require("./Routes/publicRoutes"));
app.use("/users", tokenValidator, require("./Routes/userRoutes"));
app.use("/utils", require("./Routes/utilsRoutes"));
// app.use("/messages", require("./Routes/MessageRoutes"));

app.use((err, req, res, next) => {
  const message = errorUtil.formartError(err.stack);
  res.status(400).send(message);
});

app.listen(8080, () => {
  console.log("server running on port 8080");
});
