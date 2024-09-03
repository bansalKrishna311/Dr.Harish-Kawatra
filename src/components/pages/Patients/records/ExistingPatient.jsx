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
    <div className="grid grid-cols-1 gap-9">
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add Existing Patient
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select a Patient
                </label>
                <SingleSelectPatient
                  selectedPatient={selectedPatient}
                  setSelectedPatient={setSelectedPatient}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Visit Date
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Symptoms */}
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

              {/* Diseases */}
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

              {/* Medicines */}
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

              {/* Remarks */}
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Remarks
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Write any Remarks"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExistingPatient;
