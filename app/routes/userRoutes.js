const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const checkAdminAuth = require("../middleware/checkAdminAuth");

router.use(checkAdminAuth);

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserID);

module.exports = router;
