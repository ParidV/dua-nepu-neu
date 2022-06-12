const router = require("express").Router();
const { admin_auth } = require("../../../utils/auth");

const {
  updateAdminDataValidation,
} = require("../../../validations/admin/settings");
const {
  updateAdminData,
  validateOldTokenAndGeneratingNewToken,
} = require("../../../controllers/admin/settings");

router.put(
  "/update_data",
  admin_auth,
  updateAdminDataValidation(),
  updateAdminData
);

router.post(
  "/generate_new_token",
  admin_auth,
  validateOldTokenAndGeneratingNewToken
);
module.exports = router;
