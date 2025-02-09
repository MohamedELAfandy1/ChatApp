const { getUserByID, userModel } = require("../models/userModel");

exports.redirect = async (req, res, next) => {
  res.redirect(`/profile/${req.session.userId}`);
};

exports.getProfile = async (req, res, next) => {
  let id = req.params.id;
  let searchUser = await getUserByID(id);
  let loggedUser = await getUserByID(req.session.userId);
  let friends = loggedUser.friends;
  let sendrequests = loggedUser.sentRequests;
  let friendRequests = loggedUser.friendRequests;

  res.render("profile", {
    friendRequests,
    searchUser,
    loggedUser,
    pageTitle: "Profile-page",
    isUser: loggedUser._id.toString(),
    isMe: id.toString() === loggedUser._id.toString(),
    isFriend: friends.find((f) => f.id === req.params.id),
    isRequest: friendRequests.find((r) => r.id === req.params.id),
    isSend: sendrequests.find((r) => r.id === req.params.id),
  });
};
