const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const app = express();
const authRoute = require("./routes/authentication");
const admin_categories_routes = require("./routes/admin/categories/index");
const verify = require("./utils/auth");
const cors = require("cors");

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.listen({ port: 4500 }, () => {
  console.log("Server running on port 4500");
});

app.use("/api", authRoute);
app.use("/api/admin/categories", admin_categories_routes);

// app.post("/api/logout", verify, (req, res) => {
//   const refreshToken = req.body.token;
//   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//   res.status(200).json("You logged out successfully.");
// });
