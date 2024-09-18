const Visit = require('../models/visitmodel');
const mongoose = require('mongoose');

// Create a new visit
const createVisit = async (req, res) => {
  try {
    const { patient_id, ...visitData } = req.body;
    
    // Convert patient_id to ObjectId if it's not already
    const visit = new Visit({
      ...visitData,
      patient_id: mongoose.Types.ObjectId(patient_id)
    });

    await visit.save();
    console.log('Visit:', visit);

    res.status(201).json({ message: 'Visit added successfully', visit });
  } catch (error) {
    console.error('Error creating visit:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get all visits
const getVisits = async (req, res) => {
  try {
    const visits = await Visit.find().populate('patient_id');
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific visit by ID
const getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id).populate('patient_id');
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    res.status(200).json(visit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a visit by ID
const updateVisit = async (req, res) => {
  try {
    const { patient_id, ...visitData } = req.body;

    // Convert patient_id to ObjectId
    const updatedVisitData = {
      ...visitData,
      patient_id: mongoose.Types.ObjectId(patient_id)
    };

    const visit = await Visit.findByIdAndUpdate(req.params.id, updatedVisitData, { new: true });
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    res.status(200).json({ message: 'Visit updated successfully', visit });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a visit by ID
const deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) return res.status(404).json({ error: 'Visit not found' });
    res.status(200).json({ message: 'Visit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVisit,
  getVisits,
  getVisitById,
  updateVisit,
  deleteVisit
};
