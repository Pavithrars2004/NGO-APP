const express = require("express");
const router = express.Router();
const Opportunity = require("../models/Opportunity");

router.post("/add", async (req, res) => {
  const opportunity = new Opportunity(req.body);
  await opportunity.save();
  res.json({ message: "Opportunity created" });
});

router.get("/list", async (req, res) => {
  const opportunities = await Opportunity.find();
  res.json(opportunities);
});

module.exports = router;
