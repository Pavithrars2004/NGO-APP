const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.post("/apply", async (req, res) => {
  const application = new Application(req.body);
  await application.save();
  res.json({ message: "Application submitted!" });
});

router.get("/status/:email", async (req, res) => {
  const apps = await Application.find({ email: req.params.email }).populate("opportunityId");
  res.json(apps);
});

module.exports = router;
