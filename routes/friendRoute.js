const router = require("express").Router();
const {
  addFriend,
  cancelRequest,
  rejectRequest,
  acceptRequest,
  deleteFriend,
} = require("../controllers/friendController");
const { isAuth } = require("./gaurds/authGaurd");

router.post("/addFriend", isAuth, addFriend);
router.post("/cancelRequest", isAuth, cancelRequest);
router.post("/acceptRequest", isAuth, acceptRequest);
router.post("/rejectRequest", isAuth, rejectRequest);
router.post("/deleteFriend", isAuth, deleteFriend);

module.exports = router;
