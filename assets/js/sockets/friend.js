const addFriendBtn = document.getElementById("addFriendBtn");
const loggedUserId = document.getElementById("loggedUserId").value;
const searchUserId = document.getElementById("searchUserId").value;
const searchUserName = document.getElementById("searchUserName").value;
const searchUserImage = document.getElementById("searchUserImage").value;
const loggedUserName = document.getElementById("loggedUserName").value;
const loggedUserImage = document.getElementById("loggedUserImage").value;

addFriendBtn.onclick = (e) => {
  e.preventDefault();
  socket.emit("sendFriendRequest", {
    loggedUserId,
    loggedUserImage,
    loggedUserName,
    searchUserId,
    searchUserName,
    searchUserImage,
  });
};
