import { useState, useEffect } from 'react';
import SelectGroupOne from '../../SelectGroup/SelectGroupOne'; // Make sure this import path is correct
import axios from 'axios';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    id: '', // Will be generated automatically
    name: '',
    gender: '',
    age: '',
    cdate: '', // For date of birth
    symptoms: [''],
    disease: [''],
    medicine: [''],
    pdisease: [''],
    pmedicine: [''],
    pdetected: '',
    lab_report: '',
    remarks: '',
    historyDiseases: [''],
    historyMedicines: [''],
    historyRemarks: ''
  });

  useEffect(() => {
    // Fetch the latest patient ID from the backend and increment it
    const fetchLatestPatientID = async () => {
      try {
        const response = await axios.get('/api/patients/latest-id');
        const latestID = response.data.latestID || 0;
        setFormData((prev) => ({
          ...prev,
          id: latestID + 1
        }));
      } catch (error) {
        console.error('Error fetching the latest patient ID:', error);
      }
    };

    fetchLatestPatientID();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const handleAddField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveField = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the formData to the backend
    axios.post('/api/patients', formData)
      .then((response) => {
        console.log('Patient added successfully:', response.data);
        // Reset the form or redirect the user
      })
      .catch((error) => {
        console.error('Error adding patient:', error);
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
              {/* Name */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="First name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Age
                </label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  placeholder="Age"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Gender */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Gender
                </label>
                <SelectGroupOne
                  value={formData.gender}
                  onChange={(value) => handleChange('gender', value)}
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.cdate}
                  onChange={(e) => handleChange('cdate', e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Dynamic Fields for Symptoms */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Symptoms
                </label>
                {formData.symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={symptom}
                      onChange={(e) => handleNestedChange('symptoms', index, e.target.value)}
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

              {/* Dynamic Fields for Diseases */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Diseases
                </label>
                {formData.disease.map((disease, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={disease}
                      onChange={(e) => handleNestedChange('disease', index, e.target.value)}
                      placeholder="Disease"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('disease', index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('disease')}
                  className="text-primary hover:underline"
                >
                  + Add Disease
                </button>
              </div>

              {/* Dynamic Fields for Medicines */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Medicines
                </label>
                {formData.medicine.map((medicine, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={medicine}
                      onChange={(e) => handleNestedChange('medicine', index, e.target.value)}
                      placeholder="Medicine"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('medicine', index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('medicine')}
                  className="text-primary hover:underline"
                >
                  + Add Medicine
                </button>
              </div>

              {/* Dynamic Fields for Past Diseases */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Past Diseases
                </label>
                {formData.pdisease.map((pdisease, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={pdisease}
                      onChange={(e) => handleNestedChange('pdisease', index, e.target.value)}
                      placeholder="Past Disease"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('pdisease', index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('pdisease')}
                  className="text-primary hover:underline"
                >
                  + Add Past Disease
                </button>
              </div>

              {/* Dynamic Fields for Past Medicines */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Past Medicines
                </label>
                {formData.pmedicine.map((pmedicine, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={pmedicine}
                      onChange={(e) => handleNestedChange('pmedicine', index, e.target.value)}
                      placeholder="Past Medicine"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('pmedicine', index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField('pmedicine')}
                  className="text-primary hover:underline"
                >
                  + Add Past Medicine
                </button>
              </div>

              {/* Past Detection Date */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Past Detection Date
                </label>
                <input
                  type="date"
                  value={formData.pdetected}
                  onChange={(e) => handleChange('pdetected', e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Lab Report */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Lab Report
                </label>
                <input
                  type="text"
                  value={formData.lab_report}
                  onChange={(e) => handleChange('lab_report', e.target.value)}
                  placeholder="Lab Report"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Remarks */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Remarks
                </label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) => handleChange('remarks', e.target.value)}
                  placeholder="Remarks"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Dynamic Fields for History Diseases */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  History Diseases
                </label>
                {formData.historyDiseases.map((historyDisease, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={historyDisease}
                      onChange={(e) => handleNestedChange('historyDiseases', index, e.target.value)}
                      placeholder="History Disease"
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

              {/* Dynamic Fields for History Medicines */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  History Medicines
                </label>
                {formData.historyMedicines.map((historyMedicine, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={historyMedicine}
                      onChange={(e) => handleNestedChange('historyMedicines', index, e.target.value)}
                      placeholder="History Medicine"
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
                <input
                  type="text"
                  value={formData.historyRemarks}
                  onChange={(e) => handleChange('historyRemarks', e.target.value)}
                  placeholder="History Remarks"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded bg-primary p-3 text-white transition hover:bg-opacity-90"
              >
                Add Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
  