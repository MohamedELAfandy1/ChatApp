const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionStore = require("connect-mongodb-session")(session);
const falsh = require("connect-flash");
const socketio = require("socket.io");

const app = express();
const server = require("http").createServer(app);
const io = socketio(server);

require("./sockets/friend.socket")(io);

io.on("connection", (socket) => {
  console.log("new User Connected");
  require("./sockets/intit.socket")(socket);
});

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(falsh());

app.use(bodyParser.urlencoded({ extended: true }));
const myStore = new sessionStore({
  uri: "mongodb://localhost:27017/chatApp",
  collection: "sessions",
});

app.use(
  session({
    secret: "Any Secret String To Hash Express Sessions",
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 60 * 60 * 1000,
      // expires:new Date()
    },
    store: myStore,
  })
);
app.set("view engine", "ejs");
app.set("views", "views");

const homeRouter = require("./routes/homeRoutes");
const authRouter = require("./routes/authRoute");
const profileRouter = require("./routes/profileRoute");
const friendRouter = require("./routes/friendRoute");
const { getUserByID } = require("./models/userModel");

app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      let data = await getUserByID(req.session.userId);
      req.friendRequests = data.friendRequests;
      next();
    } catch (err) {
      res.redirect("/error");
    }
  } else {
    next();
  }
});
app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/friend", friendRouter);

app.use((err, req, res, next) => {
  res.render("error", {
    friendRequests: req.friendRequests,
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin,
    err: err.message || "Something Went Wrong",
    pageTitle: "Error",
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.render("404Page", {
    friendRequests: req.friendRequests,
    isUser: req.session.userId,
    pageTitle: "Page Not Found",
    isAdmin: req.session.isAdmin,
  });
});

server.listen(4000, () => {
  console.log("Listenning On Port 4000");
});
