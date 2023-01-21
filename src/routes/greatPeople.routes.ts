import { Router } from "express";
import express from "express";
const shortid = require("shortid");
const GreatPeople = require("../models/greatPeople");
const Countries = require("../models/country");
const router = Router();

router.get("/", async (req, res: express.Response) => {
  try {
    const greatPeople = await GreatPeople.find();
    res.status(200).json(greatPeople);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});
router.get("/:countryName", async (req, res: express.Response) => {
  try {
    const greatPeople = await GreatPeople.find({
      countryName: req.params.countryName,
    });
    res.status(200).json(greatPeople);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});
router.post("/add", async (req, res) => {
  try {
    const { data } = req.body;
    const existing = await GreatPeople.findOne({ name: data.name });
    if (existing) {
      return res.status(409).json({ message: "Such person already exists" });
    } else {
      const country = await Countries.findOne({ name: data.countryName });
      const newPerson = data;
      newPerson.id = shortid.generate();
      newPerson.countryID = country.id;
      const person = new GreatPeople(newPerson);
      await person.save();
      const greatPeople = await GreatPeople.find({
        countryName: data.countryName,
      });
      res
        .status(201)
        .json({ message: "Successfully added!", data: greatPeople });
    }
  } catch (e: any) {
    res.status(500).json(e);
  }
});
router.put("/update", async (req, res) => {
  try {
    const { data } = req.body;
    await GreatPeople.updateOne({ name: data.name }, data);
    const greatPeople = await GreatPeople.find({
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
