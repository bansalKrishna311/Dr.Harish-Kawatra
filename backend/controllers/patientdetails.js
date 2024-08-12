// controllers/patientController.js
const Patient = require('../models/PatientSchema');

// Add a new patient
const addPatient = async (req, res) => {
  try {
    const { id, name, age, gender, dob, symptoms, diseases, medicines, remarks, historyDiseases, historyMedicines, historyRemarks } = req.body;

    // Create a new patient instance
    const newPatient = new Patient({
      id,
      name,
      age,
      gender,
      dob,
      symptoms,
      diseases,
      medicines,
      remarks,
      historyDiseases,
      historyMedicines,
      historyRemarks,
    });

    // Save the patient to the database
    const savedPatient = await newPatient.save();

    res.status(200).json(savedPatient);
  } catch (error) {
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

module.exports = {
  addPatient,
  getPatients,
};
