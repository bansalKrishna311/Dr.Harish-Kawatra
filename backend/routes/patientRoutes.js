const express = require('express');
const router = express.Router();
const { addPatient, getPatients, deletePatient } = require('../controllers/patientdetails');  // Ensure correct import

// POST /api/v1/patients
router.post('/patients', addPatient);

// GET /api/v1/patients
router.get('/patients', getPatients);

// DELETE /api/v1/patients/:id
router.delete('/patients/:id', deletePatient);

module.exports = router;
