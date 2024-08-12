// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const { addPatient, getPatients } = require('../controllers/patientdetails');

// POST /api/patients
router.post('/patients', addPatient);

// GET /api/patients (if you need to fetch all patients)
router.get('/', getPatients);

module.exports = router;
