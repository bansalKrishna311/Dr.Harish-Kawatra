// models/visitModel.js

const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  // patientId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Patient',
  //   required: true,
  // },
  patientId: {
    type: Number,
    ref: 'Patient',
    required: true,
  },
  visitDate: {
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
