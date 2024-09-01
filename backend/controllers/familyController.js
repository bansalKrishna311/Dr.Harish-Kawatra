const Family = require('../models/Family');

exports.addFamily = async (req, res) => {
  try {
    const { familyName, patients, remarks } = req.body;

    const newFamily = new Family({
      familyName,
      patients,
      remarks,
    });

    await newFamily.save();

    res.status(201).json({ message: 'Family added successfully', family: newFamily });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getAllFamilies = async (req, res) => {
  try {
    const families = await Family.find().populate('patients');
    res.status(200).json(families);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
