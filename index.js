const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const app = express();

app.listen({ port: 4500 }, () => {
  console.log("Server running on port 4500");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
