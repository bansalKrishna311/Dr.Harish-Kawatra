const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,  // Ensure IDs are unique
    required: true
  },
  name: {
    type: String,
    unique: true, 
    required: true
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
  date: {
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
  pdetected: {
    type: String,
    default: ''
  },
  lab_report: {
    type: String,
    default: ''
  },
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
