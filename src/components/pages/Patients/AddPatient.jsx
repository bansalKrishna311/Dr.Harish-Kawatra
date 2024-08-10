import { useState } from 'react';
import SelectGroupOne from '../../SelectGroup/SelectGroupOne'; // Ensure this import path is correct
import { useContext } from 'react';
import {UserContext} from '../../../App';

const AddPatient = () => {
  const { user, formData, setFormData,patients,setPatients} = useContext(UserContext);
  const handleAddField = (key) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key], ''],
    }));
  };

  const handleRemoveField = (key, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: prevData[key].filter((_, i) => i !== index),
    }));
  };

  const handleChange = (key, index, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: prevData[key].map((item, i) => (i === index ? value : item)),
    }));
  };

    const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key] : value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      labReport: event.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPatients((prevPatients) => [...prevPatients, formData]);
    console.log(formData)
    // Reset the form
    setFormData({
      name: '',
      age: '',
      gender: '',
      dob: '',
      symptoms: [''],
      diseases: [''],
      medicines: [''],
      remarks: '',
      historyDiseases: [''],
      historyMedicines: [''],
      historyRemarks: '',
      labReport: null,
    });

  };

  return (
    <div className="grid grid-cols-1 gap-9 lg:grid-cols-2">
      <div className="flex flex-col gap-9">
        {/* Add New Patient Form */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add New Patient
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              {/* Existing Fields */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Age
                </label>
                <input
                  type="text"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Gender
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      formData.gender ? 'text-black dark:text-white' : ''
                    }`}
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Gender
                    </option>
                    <option value="Male" className="text-body dark:text-bodydark">
                      Male
                    </option>
                    <option value="Female" className="text-body dark:text-bodydark">
                      Female
                    </option>
                    <option value="Other" className="text-body dark:text-bodydark">
                      Other
                    </option>
                  </select>

                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Dynamic Input Fields for Symptoms */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Symptoms
                </label>
                {formData.symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={symptom}
                      onChange={(e) => handleChange('symptoms', index, e.target.value)}
                      placeholder="Symptom"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('symptoms', index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('symptoms')}
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
                {formData.diseases.map((disease, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={disease}
                      onChange={(e) => handleChange('diseases', index, e.target.value)}
                      placeholder="Disease"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('diseases', index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('diseases')}
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
                {formData.medicines.map((medicine, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={medicine}
                      onChange={(e) => handleChange('medicines', index, e.target.value)}
                      placeholder="Medicine"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('medicines', index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('medicines')}
                  className="text-primary hover:underline"
                >
                  + Add Medicine
                </button>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Remarks
                </label>
                <input
                  type="text"
                  placeholder="remarks"
                  value={formData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* History Diseases */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  History Diseases
                </label>
                {formData.historyDiseases.map((historyDisease, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={historyDisease}
                      onChange={(e) => handleChange('historyDiseases', index, e.target.value)}
                      placeholder="Past Disease"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('historyDiseases', index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('historyDiseases')}
                  className="text-primary hover:underline"
                >
                  + Add History Disease
                </button>
              </div>

              {/* History Medicines */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  History Medicines
                </label>
                {formData.historyMedicines.map((historyMedicine, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={historyMedicine}
                      onChange={(e) => handleChange('historyMedicines', index, e.target.value)}
                      placeholder="Past Medicine"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('historyMedicines', index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('historyMedicines')}
                  className="text-primary hover:underline"
                >
                  + Add History Medicine
                </button>
              </div>

              {/* History Remarks */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  History Remarks
                </label>
                <textarea
                  value={formData.historyRemarks}
                  onChange={(e) => handleInputChange('historyRemarks', e.target.value)}
                  placeholder="Past Disease / Medicine Detection"
                  rows="6"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              {/* Lab Report Upload */}
              {/* <div className="mb-6">
                <label className="mb-5 block text-black dark:text-white">
                  Upload Lab Report (jpg, png, pdf)
                </label>
                <div className="relative mb-4.5 h-[250px] rounded-md border border-dashed border-primary bg-gray-100 dark:bg-[#212835]">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className="flex h-full w-full items-center justify-center px-4 text-center">
                    <div>
                      <span className="mx-auto mb-2.5 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                        <svg
                          className="fill-white"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 16V8a4 4 0 0 1 8 0v8" />
                          <line x1="12" y1="12" x2="12" y2="12" />
                          <path d="M7 16l-2 2m0 0l-2-2m2 2V8" />
                        </svg>
                      </span>
                      <p className="mt-2">Drop your file here or select to upload</p>
                      <p className="mt-1.5 text-sm">jpg, png, pdf</p>
                    </div>
                  </div>
                </div>
              </div> */}

              <button
                type="submit"
                className="mt-6 w-full rounded bg-primary p-3 text-white hover:bg-opacity-90"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;