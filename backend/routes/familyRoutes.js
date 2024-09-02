const express = require('express');
const { addFamily, getAllFamilies, getFamilyById, updateFamily, deleteFamily } = require('../controllers/familyController');

const router = express.Router();

router.post('/families', addFamily);
router.get('/families', getAllFamilies);
router.get('/families/:id', getFamilyById); // Route for getting a family by ID
router.put('/families/:id', updateFamily);  // Route for updating a family
router.delete('/families/:id', deleteFamily);

module.exports = router;
