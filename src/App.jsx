import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from './components/pages/Loader';
import PageTitle from './components/PageTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages for Patients and Families
import AddPatient from './components/pages/Patients/AddPatient';
import ExistingPatient from './components/pages/Patients/ExistingPatient';
import PatientList from './components/pages/Patients/PatientList';
import AddNewFamily from './components/pages/Families/AddNewFamily';
import FamilyList from './components/pages/Families/FamilyList';

import DefaultLayout from './layout/DefaultLayout';
import PatientRecords from './components/pages/Patients/PatientsRecords';
import FamilyRecords from './components/pages/Families/familyRecords';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home/Home';

export const UserContext = createContext();

function LoginLayout({ children }) {
  return <div>{children}</div>;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();

  // Initialize id state
  const [currentId, setCurrentId] = useState(1254);
  const [selectedOption, setSelectedOption] = useState('');
  const [patients, setPatients] = useState([]); // Array to hold all patients
  const [formData, setFormData] = useState({
    id: 12234,
    name: '',
    age: '',
    gender: '',
    date: '',
    symptoms: [''],
    diseases: [''],
    medicines: [''],
    remarks: '',
    historyDiseases: [''],
    historyMedicines: [''],
    historyRemarks: '',
    labReport: null,
  });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Update formData with the current id
    const updatedFormData = {
      ...formData,
      id: currentId,
    };
    console.log('Updated form data:', updatedFormData);
    try {
      // Send the data to the backend
      const response = await axios.post('http://localhost:4000/api/v1/patients', updatedFormData);
      console.log('Patient saved:', response.data);

      // Add new patient data to local state
      setPatients((prevPatients) => [...prevPatients, response.data]);

      // Increment the id for the next patient
      setCurrentId((prevId) => prevId + 1);

      // Reset the form
      setFormData({
        id: currentId + 1, // Update the id to the next value for form reset
        name: '',
        age: '',
        gender: '',
        date: '',
        symptoms: [''],
        diseases: [''],
        medicines: [''],
        remarks: '',
        historyDiseases: [''],
        historyMedicines: [''],
        historyRemarks: '',
        labReport: null,
      });
      toast.success('Patient saved successfully');
    } catch (error) {
      console.error('Error saving patient:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      toast.error('Failed to save patient');
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <UserContext.Provider
      value={{
        user,
        handleLogin,
        formData,
        setFormData,
        setPatients,
        patients,
        selectedOption,
        setSelectedOption,
        handleSubmit,
      }}
    >
      <ToastContainer />
      <Routes>
        {/* Home Route */}
        <Route
          path="/Home"
          element={
            <DefaultLayout>
              <PageTitle title="Home | Dr.Kawatra" />
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/"
          element={
            <LoginLayout>
              <PageTitle title="Login | Dr.Kawatra" />
              <Login />
            </LoginLayout>
          }
        />
        <Route
          path="/Signup"
          element={
            <LoginLayout>
              <PageTitle title="Signup | Dr.Kawatra" />
              <Signup />
            </LoginLayout>
          }
        />

        {/* Patients Routes */}
        <Route
          path="/patients/add-new"
          element={
            <DefaultLayout>
              <PageTitle title="Add New Patient | Your Application" />
              <AddPatient />
            </DefaultLayout>
          }
        />
        <Route
          path="/patients/add-existing"
          element={
            <DefaultLayout>
              <PageTitle title="Add Existing Patient | Your Application" />
              <ExistingPatient />
            </DefaultLayout>
          }
        />
        <Route
          path="/patients/list"
          element={
            <DefaultLayout>
              <PageTitle title="Patients List | Your Application" />
              <PatientList />
            </DefaultLayout>
          }
        />
        <Route
          path="/patients/patient-records"
          element={
            <DefaultLayout>
              <PageTitle title="Patient's Records | All Visits" />
              <PatientRecords />
            </DefaultLayout>
          }
        />
        {/* Families Routes */}
        <Route
          path="/families/add-new"
          element={
            <DefaultLayout>
              <PageTitle title="Add New Family | Your Application" />
              <AddNewFamily />
            </DefaultLayout>
          }
        />
        <Route
          path="/families/list"
          element={
            <DefaultLayout>
              <PageTitle title="Families List | Your Application" />
              <FamilyList />
            </DefaultLayout>
          }
        />
        <Route
          path="/families/family-records"
          element={
            <DefaultLayout>
              <PageTitle title="Family's Records | All Patients" />
              <FamilyRecords />
            </DefaultLayout>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
