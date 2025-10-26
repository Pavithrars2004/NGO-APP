const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
