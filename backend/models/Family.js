const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  familyName: { type: String, required: true },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  remarks: { type: String },
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
