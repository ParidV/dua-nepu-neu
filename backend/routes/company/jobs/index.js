const router = require("express").Router();
const { company_auth } = require("../../../utils/auth");

const {
  getCompanyJobs,
  storeJob,
} = require("../../../controllers/company/jobs");
const { createJob } = require("../../../validations/company/jobs");

router.get("/", company_auth, getCompanyJobs);
router.post("/", company_auth, createJob(), storeJob);
// router.get("/:id", company_auth, getOneCategory);
// router.put("/:id", company_auth, createCategories(), updateCategory);
// router.delete("/:id", company_auth, deleteCategory);
module.exports = router;
