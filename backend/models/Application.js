const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  volunteerName: String,
  email: String,
  opportunityId: { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" },
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Application", applicationSchema);
