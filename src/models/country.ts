import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    id: String,
    name: String,
    description: String,
    imageSrc: String,
    generalInfo: {
      capital: String,
      population: String,
      highestPeak: String,
      area: String,
    },
    timelineData: [
      {
        id: String,
        name: String,
        dateStart: String,
        dateEnd: String,
        description: String,
        ruler: String,
        backgroundColor: String,
      },
    ],
  },
  { collection: "Countries" }
);

module.exports = model("Countries", schema);
