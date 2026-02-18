// routes/incidentRoutes.js
const express = require("express");
const Incident = require("../models/Incident");

const router = express.Router();

// Create incident
router.post("/", async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find().populate("assignee");
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign incident
router.put("/:id/assign", async (req, res) => {
  try {
    const { assignee } = req.body;
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { assignee },
      { new: true }
    );
    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
