const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { name } = require("ejs");

const DB_URL = "mongodb://localhost:27017/chatApp";

userSchema = mongoose.Schema({
  name: String,
  image: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: [{ name: String, image: String, id: String }],
    default: [],
  },
  sentRequests: { type: [{ name: String, id: String }], default: [] },
  friendRequests: { type: [{ name: String, id: String }], default: [] },
});

const userModel = mongoose.model("user", userSchema);
// exports=userModel;

exports.signUp = async (userPayload) => {
  try {
    await mongoose.connect(DB_URL);

    if (userPayload.password !== userPayload.passwordConfirm) {
      throw new Error("Passwords do not match.");
    }

    if (await userModel.findOne({ email: userPayload.email })) {
      throw new Error("Email is already registered.");
    }

    userPayload.password = await bcrypt.hash(userPayload.password, 12);
    const user = await userModel.create(userPayload);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await mongoose.disconnect(DB_URL);
  }
};

exports.login = async (userPayload) => {
  try {
    await mongoose.connect(DB_URL);
    let user = await userModel.findOne({ email: userPayload.email });
    if (user && (await bcrypt.compare(userPayload.password, user.password))) {
      return user;
    } else {
      throw new Error("Email Or Password is Wrong");
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await mongoose.disconnect(DB_URL);
  }
};
exports.getUserByID = async (id) => {
  try {
    await mongoose.connect(DB_URL);
    let user = await userModel.findById(id);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await mongoose.disconnect(DB_URL);
  }
};
exports.getAllUsers = async (filteredObject) => {
  try {
    await mongoose.connect(DB_URL);

    let users;
    if (!filteredObject) {
      users = await userModel.find();
    } else {
      users = await userModel.find(filteredObject);
    }
    return users;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await mongoose.disconnect(DB_URL);
  }
};
exports.sendFriendRequest = async (data) => {
  try {
    await mongoose.connect(DB_URL);
    await userModel.updateOne(
      { _id: data.loggedUserId },
      {
        $push: {
          sentRequests: {
            name: data.searchUserName.toString(),
            id: data.searchUserId.toString(),
          },
        },
      }
    );
    await userModel.updateOne(
      { _id: data.searchUserId },
      {
        $push: {
          friendRequests: {
            name: data.loggedUserName.toString(),
            id: data.loggedUserId.toString(),
          },
        },
      }
    );
    mongoose.disconnect();
    return;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.cancelFriendRequest = async (data) => {
  try {
    await mongoose.connect(DB_URL);
    await userModel.updateOne(
      { _id: data.loggedUserId },
      {
        $pull: {
          sentRequests: { id: data.searchUserId.toString() },
        },
      }
    );
    await userModel.updateOne(
      { _id: data.searchUserId },
      {
        $pull: {
          friendRequests: { id: data.loggedUserId.toString() },
        },
      }
    );
    mongoose.disconnect();
    return;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};
exports.acceptFriendRequest = async (data) => {
  try {
    await mongoose.connect(DB_URL);
    await userModel.updateOne(
      { _id: data.loggedUserId },
      {
        $push: {
          friends: {
            id: data.searchUserId.toString(),
            name: data.searchUserName.toString(),
          },
        },
        $pull: {
          friendRequests: { id: data.searchUserId.toString() },
        },
      }
    );
    await userModel.updateOne(
      { _id: data.searchUserId },
      {
        $push: {
          friends: {
            id: data.loggedUserId.toString(),
            name: data.loggedUserName.toString(),
          },
        },
        $pull: {
          sentRequests: { id: data.loggedUserId.toString() },
        },
      }
    );
    mongoose.disconnect();
    return;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};
exports.rejectFriendRequest = async (data) => {
  try {
    await mongoose.connect(DB_URL);
    await userModel.updateOne(
      { _id: data.loggedUserId },
      {
        $pull: {
          friendRequests: { id: data.searchUserId.toString() },
        },
      }
    );
    await userModel.updateOne(
      { _id: data.searchUserId },
      {
        $pull: {
          sentRequests: { id: data.loggedUserId.toString() },
        },
      }
    );
    mongoose.disconnect();
    return;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.deleteFriend = async (data) => {
  try {
    await mongoose.connect(DB_URL);
    await userModel.updateOne(
      { _id: data.loggedUserId },
      {
        $pull: {
          friends: { id: data.searchUserId.toString() },
        },
      }
    );
    await userModel.updateOne(
      { _id: data.searchUserId },
      {
        $pull: {
          friends: { id: data.loggedUserId.toString() },
        },
      }
    );
    mongoose.disconnect();
    return;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};
exports.userModel = mongoose.model("user", userSchema);
