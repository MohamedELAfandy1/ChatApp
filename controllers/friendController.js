const mongoose = require("mongoose");
const {
  getUserByID,
  userModel,
  sendFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
  acceptFriendRequest,
  deleteFriend,
} = require("../models/userModel");

const DB_URL = "mongodb://localhost:27017/chatApp";

exports.addFriend = async (req, res, next) => {
  //   try {
  //     let searchUser = await getUserByID(req.body.searchUserId);
  //     let loggedUser = await getUserByID(req.session.userId.toString());
  //     await mongoose.connect(DB_URL);
  //     loggedUser.sentRequests.push({ name: searchUser.name, id: searchUser._id });
  //     searchUser.friendRequests.push({
  //       name: loggedUser.name,
  //       id: loggedUser._id,
  //     });

  //     await loggedUser.save();
  //     await searchUser.save();
  //     res.redirect(`/profile/${req.body.searchUserId}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  try {
    await sendFriendRequest(req.body);
    res.redirect(`/profile/${req.body.searchUserId}`);
  } catch (err) {
    res.redirect("/error");
  }
};

exports.cancelRequest = async (req, res, next) => {
  //   try {
  //     let searchUser = await getUserByID(req.body.searchUserId);
  //     let loggedUser = await getUserByID(req.session.userId.toString());
  //     await mongoose.connect(DB_URL);
  //     let index = loggedUser.sentRequests.findIndex(
  //       (r) => r.id === searchUser._id
  //     );
  //     loggedUser.sentRequests.splice(index, 1);
  //     index = searchUser.friendRequests.findIndex((r) => r.id === loggedUser._id);
  //     searchUser.friendRequests.splice(index, 1);
  //     await loggedUser.save();
  //     await searchUser.save();
  //     res.redirect(`/profile/${req.body.searchUserId}`);
  //   } catch (err) {
  //     console.log(err);
  //   }

  try {
    await cancelFriendRequest(req.body);
    res.redirect(`/profile/${req.body.searchUserId}`);
  } catch (err) {
    res.redirect("/error");
  }
};

exports.acceptRequest = async (req, res, next) => {
  //   try {
  //     let searchUser = await getUserByID(req.body.searchUserId);
  //     let loggedUser = await getUserByID(req.session.userId.toString());
  //     await mongoose.connect(DB_URL);
  //     let index = searchUser.sentRequests.findIndex(
  //       (r) => r.id === searchUser._id
  //     );
  //     searchUser.sentRequests.splice(index, 1);
  //     index = loggedUser.friendRequests.findIndex((r) => r.id === loggedUser._id);
  //     loggedUser.friendRequests.splice(index, 1);

  //     searchUser.friends.push({ id: loggedUser._id, name: loggedUser.name });
  //     loggedUser.friends.push({ id: searchUser._id, name: searchUser.name });
  //     await loggedUser.save();
  //     await searchUser.save();
  //     res.redirect(`/profile/${req.body.searchUserId}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  try {
    await acceptFriendRequest(req.body);
    res.redirect(`/profile/${req.body.searchUserId}`);
  } catch (err) {
    res.redirect("/error");
  }
};

exports.rejectRequest = async (req, res, next) => {
  //   try {
  //     let searchUser = await getUserByID(req.body.searchUserId);
  //     let loggedUser = await getUserByID(req.session.userId.toString());
  //     await mongoose.connect(DB_URL);
  //     let index = searchUser.sentRequests.findIndex(
  //       (r) => r.id === searchUser._id
  //     );
  //     searchUser.sentRequests.splice(index, 1);
  //     index = loggedUser.friendRequests.findIndex((r) => r.id === loggedUser._id);
  //     loggedUser.friendRequests.splice(index, 1);
  //     await loggedUser.save();
  //     await searchUser.save();
  //     res.redirect(`/profile/${req.body.searchUserId}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  try {
    await rejectFriendRequest(req.body);
    res.redirect(`/profile/${req.body.searchUserId}`);
  } catch (err) {
    res.redirect("/error");
  }
};

exports.deleteFriend = async (req, res, next) => {
  //   try {
  //     let searchUser = await getUserByID(req.body.searchUserId);
  //     let loggedUser = await getUserByID(req.session.userId.toString());
  //     await mongoose.connect(DB_URL);
  //     let index = searchUser.friends.findIndex((r) => r.id === loggedUser._id);
  //     searchUser.friends.splice(index, 1);
  //     index = loggedUser.friends.findIndex((r) => r.id === searchUser._id);
  //     loggedUser.friends.splice(index, 1);

  //     await loggedUser.save();
  //     await searchUser.save();
  //     res.redirect(`/profile/${req.body.searchUserId}`);
  //   } catch (err) {
  //     console.log(err);
  //   }

  try {
    await deleteFriend(req.body);
    res.redirect(`/profile/${req.body.searchUserId}`);
  } catch (err) {
    res.redirect("/error");
  }
};
