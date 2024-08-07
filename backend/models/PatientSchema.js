const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
 symptoms: {
    type: [String],
    default: []
  },
  cdate: {
    type: Date,
    required: true
  },
  disease: [
    {
      ills: {
        type: String,
        required: true
      }
    }
  ],
  medicine: [
    {
      meds: {
        type: String,
        required: true
      }
    }
  ],
  pdisease: [
    {
      ill: {
        type: String,
        default: ''
      }
    }
  ],
  pmedicine: [
    {
      pmeds: {
        type: String,
        default: ''
      }
    }
  ],
  
  pdetected: {
    type: String,
    default: ''
  },
  lab_report: {
    type: String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', PatientSchema);
