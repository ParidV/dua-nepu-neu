const router = require("express").Router();
const { admin_auth } = require("../../../utils/auth");

const {
  updateAdminDataValidation,
} = require("../../../validations/admin/settings");
const { updateAdminData } = require("../../../controllers/admin/settings");

router.put(
  "/update_data",
  admin_auth,
  updateAdminDataValidation(),
  updateAdminData
);
module.exports = router;
