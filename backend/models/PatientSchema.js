// PatientSchema.js
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  id: {
    type: Number,
    // required: true,
    // unique: true
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: String,
  },
  symptoms: {
    type: [String],
    default: []
  },
  cdate: {
    type: Date,

  },
  disease: [
    {
      ills: {
        type: String,
      }
    }
  ],
  medicine: [
    {
      meds: {
        type: String,
      
      }
    }
  ],
  remarks: {
    type: String,
    default: ''
  },
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

// new added
dob: {
    type: Date,
    default: ''
  },
  medicines: {
    type: [String],
    default: []
  },
  diseases: {
    type: [String],
    default: []
  },
  historyDiseases: {
    type: [String],
    default: []
  },
  historyMedicines: {
    type: [String],
    default: []
  },
  historyRemarks: {
    type: String,
    default: ''
  },
  // tilll here

  pdetected: {
    type: String,
    default: ''
  },

  lab_report: {
    type: String,
    default: ''
  },
  craeted_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', PatientSchema);
