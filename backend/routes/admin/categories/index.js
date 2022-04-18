const router = require("express").Router();
const { admin_auth } = require("../../../utils/auth");

const { createCategories } = require("../../../validations/admin/categories");
const {
  storeCategories,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../../../controllers/admin/categories");

router.get("/", admin_auth, getAllCategories);
router.post("/", admin_auth, createCategories(), storeCategories);
router.get("/:id", admin_auth, getOneCategory);
router.put("/:id", admin_auth, createCategories(), updateCategory);
router.delete("/:id", admin_auth, deleteCategory);
module.exports = router;
