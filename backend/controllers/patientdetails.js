const Patient = require('../models/PatientSchema');

// Add a new patient
const addPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(200).json(savedPatient);
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).json({ message: 'Failed to add patient', error });
  }
};

// Get all patients (optional, if you need it)
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patients', error });
  }
};

// Delete a patient by ID
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await Patient.findByIdAndDelete(id); // Use `findByIdAndDelete` with `_id` field
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete patient', error });
  }
};

// Update a patient by ID
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update patient', error });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id); // Use `findById` with `_id` field
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patient', error });
  }
};

module.exports = {
  addPatient,
  getPatients,
  deletePatient,
  updatePatient,
  getPatientById,
};
