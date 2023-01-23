import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    id: String,
    email: String,
    username: String,
    password: String,
  },
  { collection: "User" }
);

module.exports = model("User", schema);
