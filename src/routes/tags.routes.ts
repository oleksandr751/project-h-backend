import { Router } from "express";
const Tags = require("../models/tags");
const router = Router();
router.get("/", async (req, res) => {
  try {
    const tags = await Tags.find();
    res.status(201).json(tags);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});
router.post("/add", async (req, res) => {
  try {
    const { data } = req.body;
    await Tags.updateOne({ name: data.name }, data);
    const greatPeople = await Tags.find({
      countryName: data.countryName,
    });
    res
      .status(201)
      .json({ message: "Successfully updated!", data: greatPeople });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});
module.exports = router;
