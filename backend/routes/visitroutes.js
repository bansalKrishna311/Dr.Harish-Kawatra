const express = require('express');
const { createVisit, getVisits, getVisitById, updateVisit, deleteVisit } = require('../controllers/visitcontroller');

const router = express.Router();

router.post('/visits', createVisit);
router.get('/visits', getVisits);
router.get('/visits/:id', getVisitById);
router.put('/visits/:id', updateVisit);
router.delete('/visits/:_id', deleteVisit);


module.exports = router;
