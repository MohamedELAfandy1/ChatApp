module.exports = (socket) => {
  socket.on("joinNotficationsRoom", (id) => {
    socket.join(id);
    console.log("Joined", id);
  });
};
