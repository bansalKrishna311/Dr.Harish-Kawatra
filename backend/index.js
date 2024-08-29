const express = require('express');
const app = express();
const cors = require('cors');
const { dbconnect } = require('./config/database');
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to match your frontend URL
}));
app.use(express.json());

const PORT = process.env.PORT || 4000;
dbconnect();

const user = require('./routes/user');
app.use("/api/v1", user);

const patientRoutes = require('./routes/patientRoutes');
app.use('/api/v1', patientRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
