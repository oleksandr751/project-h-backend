import mongoose from "mongoose";
import express from "express";
import { MONGO_URI } from "./config/index";
const app = express();
const cors = require("cors");
const port = process.env.PORT;
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/countries", require("./routes/countries.routes"));
app.use("/api/greatPeople", require("./routes/greatPeople.routes"));
app.use("/api/tags", require("./routes/tags.routes"));
app.use("/api/chartValues", require("./routes/values.routes"));
app.use("/api/auth", require("./routes/users.routes"));

const PORT = process.env.PORT || port || 5000;
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log(`App has been started on ${PORT}`));
  } catch (e: any) {
    console.log(e.message);
    process.exit(1);
  }
}

start();
