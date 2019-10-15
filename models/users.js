import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ googleId: String });

mongoose.model("users", userSchema);
