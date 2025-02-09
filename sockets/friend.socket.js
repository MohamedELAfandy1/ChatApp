const { sendFriendRequest } = require("../models/userModel");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("sendFriendRequest", async (data) => {
      try {
        console.log(data);
        // await sendFriendRequest(data);
        // socket.emit("requestSent");
        io.to(data.searchUserId).emit("newFriendRequest", {
          name: data.loggedUserName,
          id: data.loggedUserId,
        });
      } catch (err) {
        socket.emit("requestFailed");
      }
    });
  });
};
