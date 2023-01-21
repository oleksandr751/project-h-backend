import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    countryID: String,
    countryName: String,
    dataName: String,
    data: [{ timeStamp: String, value: Number }],
  },
  { collection: "ChartValues" }
);

module.exports = model("ChartValues", schema);
