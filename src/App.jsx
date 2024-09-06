import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from './components/pages/Loader';
import PageTitle from './components/PageTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPatient from './components/pages/Patients/AddPatient';
import EditPatient from './components/pages/Patients/EditPatient';
import PatientList from './components/pages/Patients/PatientList';
import AddNewFamily from './components/pages/Families/AddOrEditFamily';
import FamilyList from './components/pages/Families/FamilyList';
import DefaultLayout from './layout/DefaultLayout';
import PatientRecords from './components/pages/Patients/records/PatientsRecords';
import FamilyRecords from './components/pages/Families/FamilyRecords';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home/Home';
import AddOrEditFamily from './components/pages/Families/AddOrEditFamily';
import ExistingPatient from './components/pages/Patients/records/ExistingPatient';
import EditVisit from './components/pages/Patients/records/EditVisit';

export const UserContext = createContext();

function LoginLayout({ children }) {
  return <div>{children}</div>;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();

  // Initialize id state
  const [currentId, setCurrentId] = useState();
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
  function generateRandomId(length) {
    let result = '';
    const characters = '1234567890';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newId=generateRandomId(6)

    // Update formData with the current id
    const updatedFormData = {
      ...formData,
      id: newId,
    };
    console.log('Updated form data:', updatedFormData);
    try {
      // Send the data to the backend
      const response =await axios.post('http://localhost:4000/api/v1/patients', updatedFormData);
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
              <PageTitle title="Add New Patient |  Dr.Kawatra" />
              <AddPatient />
            </DefaultLayout>
          }
        />
        <Route
          path="/patients/:id/edit"
          element={
            <DefaultLayout>
              <PageTitle title="Edit Patient |  Dr.Kawatra" />
              <EditPatient />
            </DefaultLayout>
          }
        />
        <Route
          path="/patients"
          element={
            <DefaultLayout>
              <PageTitle title="Patients List | Dr.Kawatra" />
              <PatientList />
            </DefaultLayout>
          }
        />
       <Route
          path="/patients/:patient_id/records"
          element={
            <DefaultLayout>
              <PageTitle title="Patient Records | Dr.Kawatra" />
              <PatientRecords />
            </DefaultLayout>
          }
        />
        <Route
          path="/patients/add-existing"
          element={
            <DefaultLayout>
              <PageTitle title="Add Existing Patient |  Dr.Kawatra" />
              <EditPatient />
            </DefaultLayout>
          }
        />
            <Route
          path="/patients/ExistingPatient"
          element={
            <DefaultLayout>
              <PageTitle title="Add Existing Patient |  Dr.Kawatra" />
              <ExistingPatient />
            </DefaultLayout>
          }
        />  

<Route
          path="/edit-visit/:visitId"
          element={
            <DefaultLayout>
              <PageTitle title="Add Existing Patient |  Dr.Kawatra" />
              <EditVisit />
            </DefaultLayout>
          }
        />  

        {/* Families Routes */}
        <Route
          path="/families/new"
          element={
            <DefaultLayout>
              <PageTitle title="Add New Family |  Dr.Kawatra" />
              <AddOrEditFamily />
            </DefaultLayout>
          }
        />
         <Route
          path="/families/edit/:id"
          element={
            <DefaultLayout>
              <PageTitle title="Add New Family |  Dr.Kawatra" />
              <AddOrEditFamily />
            </DefaultLayout>
          }
        />
        <Route
          path="/families"
          element={
            <DefaultLayout>
              <PageTitle title="Families List |  Dr.Kawatra" />
              <FamilyList />
            </DefaultLayout>
          }
        />
        <Route
          path="/families/family-records/:id"
          element={
            <DefaultLayout>
              <PageTitle title="Family's Records | Dr.Kawatra" />
              <FamilyRecords />
            </DefaultLayout>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
