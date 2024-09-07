import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectGroupOne from '../../SelectGroup/SelectGroupOne';

interface Patient {
  name: string;
  age: string;
  gender: string;
  date: string;
  symptoms: string[];
  diseases: string[];
  medicines: string[];
  remarks: string;
}

const EditPatient = () => {
  const { id } = useParams<{ id: string }>(); // Capture the ID from the URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null); // State to hold the patient data
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [diseases, setDiseases] = useState<string[]>([]);
  const [medicines, setMedicines] = useState<string[]>([]);

  // Fetch patient data by ID
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`https://dr-harish-kawatra.onrender.com/api/v1/patients/${id}`);
        setPatient(response.data);
        setSymptoms(response.data.symptoms || []);
        setDiseases(response.data.diseases || []);
        setMedicines(response.data.medicines || []);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    if (id) {
      fetchPatient();
    }
  }, [id]);

  // Handle add, remove, and change for dynamic input fields
  const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const handleRemoveField = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.map((item, i) => (i === index ? value : item)));
  };

  // Handle form submission (for updating the patient)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return; // Exit if patient data is not loaded

    try {
      const updatedPatient = {
        ...patient,
        symptoms,
        diseases,
        medicines,
      };
      await axios.put(`https://dr-harish-kawatra.onrender.com/api/v1/patients/${id}`, updatedPatient);
      navigate('/patients'); // Redirect to the patients list after successful update
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {id ? 'Edit Patient' : 'Add Existing Patient'}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              {/* Removed SelectGroupTwo component */}

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={patient.name}
                  onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Age
                </label>
                <input
                  type="text"
                  placeholder="Age"
                  value={patient.age}
                  onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Gender
                </label>
                <SelectGroupOne value={patient.gender} onChange={(value) => setPatient({ ...patient, gender: value })} />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Date
                </label>
                <input
                  type="date"
                  value={patient.date}
                  onChange={(e) => setPatient({ ...patient, date: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Symptoms
                </label>
                {symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={symptom}
                      onChange={(e) => handleChange(index, e.target.value, setSymptoms)}
                      placeholder="Symptom"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index, setSymptoms)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField(setSymptoms)}
                  className="text-primary hover:underline"
                >
                  + Add Symptom
                </button>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Diseases
                </label>
                {diseases.map((disease, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={disease}
                      onChange={(e) => handleChange(index, e.target.value, setDiseases)}
                      placeholder="Disease"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index, setDiseases)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField(setDiseases)}
                  className="text-primary hover:underline"
                >
                  + Add Disease
                </button>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Medicines
                </label>
                {medicines.map((medicine, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={medicine}
                      onChange={(e) => handleChange(index, e.target.value, setMedicines)}
                      placeholder="Medicine"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index, setMedicines)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField(setMedicines)}
                  className="text-primary hover:underline"
                >
                  + Add Medicine
                </button>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Remarks
                </label>
                <textarea
                  rows={6}
                  placeholder="Write any Remarks"
                  value={patient.remarks}
                  onChange={(e) => setPatient({ ...patient, remarks: e.target.value })}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded bg-primary py-2 px-4 font-medium text-white hover:bg-opacity-90"
              >
                Save Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPatient;
