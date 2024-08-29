const express = require('express');
const router = express.Router();
const { addPatient, getPatients, deletePatient, updatePatient, getPatientById } = require('../controllers/patientdetails');

// POST /api/v1/patients
router.post('/patients', addPatient);

// GET /api/v1/patients
router.get('/patients', getPatients);

// DELETE /api/v1/patients/:id
router.delete('/patients/:id', deletePatient);

// PUT (Edit) /api/v1/patients/:id
router.put('/patients/:id', updatePatient);

router.get('/patients/:id', getPatientById);

module.exports = router;
