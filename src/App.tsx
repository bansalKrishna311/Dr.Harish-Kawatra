import { useEffect, useState } from 'react';
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

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Home | Your Application" />
              {/* Home Component should be added here if it exists */}
            </>
          }
        />

        {/* Patients Routes */}
        <Route
          path="/patients/add-new"
          element={
            <>
              <PageTitle title="Add New Patient | Your Application" />
              <AddPatient />
            </>
          }
        />
        <Route
          path="/patients/add-existing"
          element={
            <>
              <PageTitle title="Add Existing Patient | Your Application" />
              <ExistingPatient />
            </>
          }
        />
        <Route
          path="/patients/list"
          element={
            <>
              <PageTitle title="Patients List | Your Application" />
              <PatientList />
            </>
          }
        />

        {/* Families Routes */}
        <Route
          path="/families/add-new"
          element={
            <>
              <PageTitle title="Add New Family | Your Application" />
              <AddNewFamily />
            </>
          }
        />
        <Route
          path="/families/list"
          element={
            <>
              <PageTitle title="Families List | Your Application" />
              <FamilyList />
            </>
          }
        />

        {/* Other Routes */}
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Your Application" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Your Application" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Your Application" />
              <Tables />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Your Application" />
              <Buttons />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
