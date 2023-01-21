import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    countryID: String,
    countryName: String,
    dateStart: String,
    dateEnd: String,
    imageSrc: String,
    name: String,
    occupation: String,
    tags: [String],
  },
  { collection: "GreatPeople" }
);

module.exports = model("GreatPeople", schema);
