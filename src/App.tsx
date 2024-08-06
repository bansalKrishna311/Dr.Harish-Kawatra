import { useEffect, useState, createContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

// Import pages for Patients and Families
import AddPatient from './components/Patients/AddPatient';
import ExistingPatient from './components/Patients/ExistingPatient';
import PatientList from './components/Patients/PatientList';
import AddNewFamily from './components/Families/AddNewFamily';
import FamilyList from './components/Families/FamilyList';

import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';

import Tables from './pages/Tables';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import PatientRecords from './components/Patients/PatientsRecords';
import FamilyRecords from './components/Families/familyRecords';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

export const UserContext = createContext();

function LoginLayout({ children }) {
  return <div>{children}</div>;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();

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
    <UserContext.Provider value={{ user, handleLogin }}>
      <Routes>
        {/* Home Route */}
        <Route
          path="/Home"
          element={
            <DefaultLayout>
              <PageTitle title="Home | Dr.Kawatra" />
              <Home/>
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
        {/* Other Routes */}
        <Route
          path="/forms/form-elements"
          element={
            <DefaultLayout>
              <PageTitle title="Form Elements | Your Application" />
              <FormElements />
            </DefaultLayout>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <DefaultLayout>
              <PageTitle title="Form Layout | Your Application" />
              <FormLayout />
            </DefaultLayout>
          }
        />
        <Route
          path="/tables"
          element={
            <DefaultLayout>
              <PageTitle title="Tables | Your Application" />
              <Tables />
            </DefaultLayout>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <DefaultLayout>
              <PageTitle title="Buttons | Your Application" />
              <Buttons />
            </DefaultLayout>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
