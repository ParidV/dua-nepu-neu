const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const authRoute = require("./routes/authentication");
const admin_categories_routes = require("./routes/admin/categories/index");
const admin_jobs_routes = require("./routes/admin/jobs/index");
const admin_settings_routes = require("./routes/admin/settings/index");
const company_jobs_routes = require("./routes/company/jobs/index");
const cors = require("cors");

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.listen({ port: process.env.PORT }, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});

app.use("/api", authRoute);

// admin routes
app.use("/api/admin/categories", admin_categories_routes);
app.use("/api/admin/jobs", admin_jobs_routes);
app.use("/api/admin/settings", admin_settings_routes);

// company routes
app.use("/api/company/jobs", company_jobs_routes);
