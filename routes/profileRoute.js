const router = require("express").Router();
const {
  getProfile,
  redirect,
} = require("../controllers/profileController");
const { isAuth } = require("./gaurds/authGaurd");

router.get("/", isAuth, redirect);
router.get("/:id", isAuth, getProfile);

module.exports = router;
