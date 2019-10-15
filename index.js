import express from "express";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
const keys = require("./config/keys");

require("./models/users");
require("./services/passport");

mongoose
  .connect(keys.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("database connected"));

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes/userRouter")(app);
require("./routes/authRouter")(app, passport);

app.get("/", (req, res) => {
  let adminContent = `You are logged in. You can view admins at <a href='/admins'>admins</a>.
    `;
  if (!req.user) {
    adminContent = `please login here <a href='/auth/google'>login</a>.`;
  }
  res.send(
    `You can view users here <a href='/users'>users</a>.${adminContent}
    You can view current user at <a href='/current_user'>current user</a>. `
  );
});

app.listen(5000, () => console.log("server is listening at port 5000"));
