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
    // required: true,
  },
  symptoms: {
    type: [String],
    default: []
  },
  disease: [
    {
      ills: {
        type: String,
      }
    }
  ],
  diseases:[],
  medicine: [
    {
      meds: {
        type: String,
      }
    }
  ],
  remarks: {
    type: String,
  },
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
