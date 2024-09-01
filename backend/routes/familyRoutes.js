const express = require('express');
const { addFamily, getAllFamilies } = require('../controllers/familyController');

const router = express.Router();

router.post('/families', addFamily);
router.get('/families', getAllFamilies);

module.exports = router;
