const express = require('express');
const { addFamily, getAllFamilies, deleteFamily } = require('../controllers/familyController');

const router = express.Router();

router.post('/families', addFamily);
router.get('/families', getAllFamilies);
router.delete('/families/:id', deleteFamily);

module.exports = router;
