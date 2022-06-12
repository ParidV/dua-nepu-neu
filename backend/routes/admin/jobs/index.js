const router = require("express").Router();
const { admin_auth } = require("../../../utils/auth");

const { getAllJobs } = require("../../../controllers/admin/jobs");

router.get("/", admin_auth, getAllJobs);

module.exports = router;
