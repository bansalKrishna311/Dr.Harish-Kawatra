const Family = require('../models/Family');

exports.addFamily = async (req, res) => {
  try {
    const { name, patients, remarks } = req.body;

    const newFamily = new Family({
      name,
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

exports.deleteFamily = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFamily = await Family.findByIdAndDelete(id);

    if (!deletedFamily) {
      return res.status(404).json({ message: 'Family not found' });
    }

    res.status(200).json({ message: 'Family deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
// In familyController.js
exports.getFamilyById = async (req, res) => {
  try {
    const { id } = req.params;
    const family = await Family.findById(id).populate('patients');

    if (!family) {
      return res.status(404).json({ message: 'Family not found' });
    }

    res.status(200).json(family);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.updateFamily = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, patients, remarks } = req.body;

    const updatedFamily = await Family.findByIdAndUpdate(
      id,
      { name, patients, remarks },
      { new: true } // Return the updated document
    );

    if (!updatedFamily) {
      return res.status(404).json({ message: 'Family not found' });
    }

    res.status(200).json({ message: 'Family updated successfully', family: updatedFamily });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
