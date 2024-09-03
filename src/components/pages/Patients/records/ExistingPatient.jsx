import React, { useState } from 'react';
import axios from 'axios';
import SingleSelectPatient from './SingleSelectPatient';

const ExistingPatient = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [visitDate, setVisitDate] = useState('');
  const [symptoms, setSymptoms] = useState(['']);
  const [diseases, setDiseases] = useState(['']);
  const [medicines, setMedicines] = useState(['']);
  const [remarks, setRemarks] = useState('');

  const handleAddField = (setter) => setter((prev) => [...prev, '']);
  const handleRemoveField = (index, setter) =>
    setter((prev) => prev.filter((_, i) => i !== index));
  const handleChange = (index, value, setter) =>
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const visitData = {
      patientId: selectedPatient,
      visitDate,
      symptoms,
      diseases,
      medicines,
      remarks,
    };

    try {
      await axios.post('http://localhost:4000/api/v1/visits', visitData);
      alert('Visit submitted successfully!');
    } catch (error) {
      console.error('Error submitting visit:', error);
      alert('There was an error submitting the visit.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
          Existing Patient Visit
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <SingleSelectPatient
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-black dark:text-white">
              Visit Date
            </label>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Symptoms */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Symptoms
            </label>
            {symptoms.map((symptom, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={symptom}
                  onChange={(e) => handleChange(index, e.target.value, setSymptoms)}
                  placeholder="Symptom"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, setSymptoms)}
                  className="ml-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField(setSymptoms)}
              className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Add Symptom
            </button>
          </div>

          {/* Diseases */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Diseases
            </label>
            {diseases.map((disease, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={disease}
                  onChange={(e) => handleChange(index, e.target.value, setDiseases)}
                  placeholder="Disease"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, setDiseases)}
                  className="ml-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField(setDiseases)}
              className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Add Disease
            </button>
          </div>

          {/* Medicines */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Medicines
            </label>
            {medicines.map((medicine, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={medicine}
                  onChange={(e) => handleChange(index, e.target.value, setMedicines)}
                  placeholder="Medicine"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index, setMedicines)}
                  className="ml-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField(setMedicines)}
              className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Add Medicine
            </button>
          </div>

          {/* Remarks */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Remarks
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Remarks"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded bg-blue-500 py-3 px-6 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExistingPatient;
