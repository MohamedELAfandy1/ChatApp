const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    friendRequests: req.friendRequests,
    pageTitle: "Home-Page",
    isUser: req.session.userId || false,
  });
});

module.exports = router;
 