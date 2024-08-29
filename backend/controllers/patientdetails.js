const Patient = require('../models/PatientSchema');

// Add a new patient
const addPatient = async (req, res) => {
  try {
    const { name, age, gender, date, symptoms, diseases, medicines, remarks, historyDiseases, historyMedicines, historyRemarks } = req.body;

    // Find the highest current ID
    const lastPatient = await Patient.findOne().sort({ id: -1 });
    const nextId = lastPatient ? lastPatient.id + 1 : 1;

    // Create a new patient instance
    const newPatient = new Patient({
      id: nextId,
      name,
      age,
      gender,
      date,
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
    await Patient.findOneAndDelete({ id: parseInt(id) });  // Use `findOneAndDelete` with `id` field
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete patient', error });
  }
};

module.exports = {
  addPatient,
  getPatients,
  deletePatient,
};
