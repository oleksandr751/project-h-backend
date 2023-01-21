import { Router } from "express";
import express from "express";
const shortid = require("shortid");
const Countries = require("../models/country");
const router = Router();

router.get("/", async (req, res: express.Response) => {
  try {
    const countries = await Countries.find();
    res.status(200).json(countries);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.get("/:id", async (req, res: express.Response) => {
  try {
    const country = await Countries.findOne({ id: req.params.id });
    country
      ? res.status(200).json(country)
      : res.status(404).json({ message: "Country not found" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});
router.post("/addCountry", async (req, res) => {
  try {
    const { data } = req.body;
    const existing = await Countries.findOne({ name: data.name });
    if (existing) {
      return res.status(409).json({ message: "Such country already exists" });
    } else {
      const newCountry = data;
      newCountry.id = shortid.generate();
      const timelineData = data.timelineData.map((timelineItem: any) => {
        timelineItem.id = shortid.generate();
        return timelineItem;
      });
      newCountry.timelineData = timelineData;
      const country = new Countries(newCountry);
      await country.save();
      res.status(201).json({ country });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.get("/countryNames", async (req, res: express.Response) => {
  try {
    const countries = await Countries.find();
    res.status(200).json(countries.map((country: any) => country.name));
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});
module.exports = router;
