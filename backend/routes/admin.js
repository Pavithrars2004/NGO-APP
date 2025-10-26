const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.get("/applications", async (req, res) => {
  const applications = await Application.find().populate("opportunityId");
  res.json(applications);
});

router.put("/update/:id", async (req, res) => {
  const { status } = req.body;
  await Application.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Status updated" });
});

module.exports = router;
