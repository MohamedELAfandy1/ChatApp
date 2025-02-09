const socket = io();

socket.on("connect", () => {
  let id = document.getElementById("userId").value;
  console.log(id);
  socket.emit("joinNotficationsRoom", id);
});

socket.on("newFriendRequest", (data) => {
  console.log(data);
});
