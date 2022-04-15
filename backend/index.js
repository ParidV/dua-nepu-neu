const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const authRoute = require("./routes/authentication");
const admin_categories_routes = require("./routes/admin/categories/index");
const admin_jobs_routes = require("./routes/admin/jobs/index");
const cors = require("cors");

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.listen({ port: 4500 }, () => {
  console.log(`Server running on port http://localhost:4500`);
});

app.use("/api", authRoute);
app.use("/api/admin/categories", admin_categories_routes);
app.use("/api/admin/jobs", admin_jobs_routes);
