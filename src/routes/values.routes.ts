import { Router } from "express";
import express from "express";
const ChartValues = require("../models/values");
const router = Router();

router.get("/:countryName/:dataName", async (req, res: express.Response) => {
  try {
    const chartValues = await ChartValues.findOne({
      countryName: req.params.countryName,
      dataName: req.params.dataName,
    });
    res.status(200).json(chartValues);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});
module.exports = router;
