import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// ✅ Initialize app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Schemas
const opportunitySchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date,
});
const Opportunity = mongoose.model("Opportunity", opportunitySchema);

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  reason: String,
  opportunityId: { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" },
  status: { type: String, default: "pending" },
});
const Application = mongoose.model("Application", applicationSchema);

//
// 🚀 ROUTES
//

// NGO posts opportunity
app.post("/api/opportunities", async (req, res) => {
  try {
    const opp = await Opportunity.create(req.body);
    res.json(opp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all opportunities
app.get("/api/opportunities", async (req, res) => {
  const opps = await Opportunity.find();
  res.json(opps);
});

// Volunteer applies
app.post("/api/applications", async (req, res) => {
  try {
    const appData = await Application.create(req.body);
    res.json(appData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all applications
app.get("/api/applications", async (req, res) => {
  const apps = await Application.find().populate("opportunityId");
  res.json(apps);
});

// ✅ Update application status + send email
app.put("/api/applications/:id", async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("opportunityId");

    if (!updated) return res.status(404).json({ error: "Application not found" });

    await sendEmailNotification(updated);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Email sending helper
async function sendEmailNotification(application) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let subject = "";
  let message = "";

  if (application.status === "approved") {
    subject = "🎉 Your Volunteer Application Has Been Approved!";
    message = `
      <h2>Congratulations ${application.name}!</h2>
      <p>Your application for <strong>${application.opportunityId?.title}</strong> has been 
      <strong style="color:green;">approved</strong>.</p>
      <p>Thank you for volunteering to make a difference!</p>
      <br/>
      <p>Warm regards,<br/>Volunteer Connect Team</p>
    `;
  } else if (application.status === "rejected") {
    subject = "❌ Volunteer Application Update";
    message = `
      <h2>Hello ${application.name},</h2>
      <p>We regret to inform you that your application for 
      <strong>${application.opportunityId?.title}</strong> was 
      <strong style="color:red;">not approved</strong> this time.</p>
      <p>Don’t lose hope — more opportunities are coming soon!</p>
      <br/>
      <p>With appreciation,<br/>Volunteer Connect Team</p>
    `;
  }

  await transporter.sendMail({
    from: `"Volunteer Connect" <${process.env.EMAIL_USER}>`,
    to: application.email,
    subject,
    html: message,
  });
}

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
