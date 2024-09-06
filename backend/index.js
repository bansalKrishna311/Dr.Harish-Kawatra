const express = require('express');
const app = express();
const cors = require('cors');
const { dbconnect } = require('./config/database');
require('dotenv').config();

app.use(cors({
    // origin: 'http://localhost:5173', 
    origin:'https://dr-harish-kawatra.vercel.app/'// Adjust this to match your frontend URL
}));
app.use(express.json());

const PORT = process.env.PORT || 4000;
dbconnect();

const user = require('./routes/user');
app.use("/api/v1", user);

const patientRoutes = require('./routes/patientRoutes');
app.use('/api/v1', patientRoutes);

const familyRoutes = require('./routes/familyRoutes');  
app.use('/api', familyRoutes);

const visitRoutes = require('./routes/visitroutes');
app.use('/api/v1', visitRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


app.put('/api/v1/patients/:patient_id/family', async (req, res) => {
    const { patient_id } = req.params;
    const { familyId } = req.body;
  
    try {
      // Find the patient and update their family
      const patient = await Patient.findById(patient_id);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      // Update the patient's family
      patient.family = familyId;
      await patient.save();
  
      // Optionally, you can also update the Family document to include the patient
      const family = await Family.findById(familyId);
      if (family) {
        family.patients.push(patient._id);
        await family.save();
      }
  
      res.status(200).json({ message: 'Patient family updated successfully' });
    } catch (error) {
      console.error('Error updating patient family:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });