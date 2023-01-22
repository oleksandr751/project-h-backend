import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    userId: String,
    email: String,
    userName: String,
    password: String,
  },
  { collection: "User" }
);

module.exports = model("User", schema);
