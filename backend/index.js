const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStratrgy = require("passport-local");
const User = require("./models/User.js");

const taskRouter = require("./routers/task.js");
const userRouter = require("./routers/user.js");

connectDB();

const cookieOptions = {
  expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: cookieOptions,
};

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratrgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/tasks", taskRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
