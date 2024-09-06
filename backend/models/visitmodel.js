// models/visitModel.js

const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({

  patient_id: {  
    type: Number,
    ref: 'Patient',
    required: true,
  },
  cdate: {
    type: Date,
    required: true,
  },
  symptoms: [String],
  diseases: [String],
  medicines: [String],
  remarks: {
    type: String,
  },
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
