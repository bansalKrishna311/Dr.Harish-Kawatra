import { useEffect, useState, createContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './components/pages/Loader';
import PageTitle from './components/PageTitle';

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
  const [patients, setPatients] = useState([]); // Array to hold all patients
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    dob: '',
    symptoms: [''],
    diseases: [''],
    medicines: [''],
    historyDiseases: [''],
    historyMedicines: [''],
    historyRemarks: '',
    labReport: null, // Lab report file
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

  return loading ? (
    <Loader />
  ) : (
    <UserContext.Provider value={{ user, handleLogin,formData,setFormData,setPatients,patients }}>
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
