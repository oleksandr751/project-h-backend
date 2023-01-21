import { Schema, model, Types } from "mongoose";

const schema = new Schema({ tags: [String] }, { collection: "Tags" });

module.exports = model("Tags", schema);
