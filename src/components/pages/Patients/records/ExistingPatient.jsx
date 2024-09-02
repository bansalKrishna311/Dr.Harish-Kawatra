import React, { useState } from 'react';
import SelectGroupOne from '../../../SelectGroup/SelectGroupone.jsx'; // Make sure this import path is correct
import SingleSelectPatient from './SingleSelectPatient.jsx';

const ExistingPatient = () => {
  const [symptoms, setSymptoms] = useState(['']);
  const [diseases, setDiseases] = useState(['']);
  const [medicines, setMedicines] = useState(['']);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleAddField = (setter) => {
    setter(prev => [...prev, '']);
  };

  const handleRemoveField = (index, setter) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, value, setter) => {
    setter(prev => prev.map((item, i) => (i === index ? value : item)));
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="w-full">
        {/* Add Existing Patient Form */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add Existing Patient
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
            <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
                Select a Patient
                </label>
              {/* Patient Selector */}
              <SingleSelectPatient
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}  />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Age
                </label>
                <input
                  type="text"
                  placeholder="Age"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

            
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Date 
                </label>
                <input
                  type="date"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Dynamic Input Fields for Symptoms */}
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

              {/* Dynamic Input Fields for Diseases */}
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

              {/* Dynamic Input Fields for Medicines */}
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

            

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90 focus:outline-none">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExistingPatient;
