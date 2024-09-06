import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SingleSelectPatient from './SingleSelectPatient';

const EditVisit = () => {
  const { visitId } = useParams<{ visitId: string }>();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [visitDate, setVisitDate] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>(['']);
  const [diseases, setDiseases] = useState<string[]>(['']);
  const [medicines, setMedicines] = useState<string[]>(['']);
  const [remarks, setRemarks] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const response = await axios.get(`https://dr-harish-kawatra.onrender.com/api/v1/visits/${visitId}`);
        const visit = response.data;
        setSelectedPatient(visit.patient_id);
        setVisitDate(visit.visitDate);
        setSymptoms(visit.symptoms);
        setDiseases(visit.diseases);
        setMedicines(visit.medicines);
        setRemarks(visit.remarks);
      } catch (error) {
        console.error('Error fetching visit data:', error);
      }
    };

    fetchVisitData();
  }, [visitId]);

  const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => setter((prev) => [...prev, '']);
  const handleRemoveField = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter((prev) => prev.filter((_, i) => i !== index));
  const handleChange = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const visitData = {
      patient_id: selectedPatient,
      visitDate,
      symptoms,
      diseases,
      medicines,
      remarks,
    };

    try {
      await axios.put(`https://dr-harish-kawatra.onrender.com/api/v1/visits/${visitId}`, visitData);
      alert('Visit updated successfully!');
      navigate(`/patients/${visitId}/records`);
    } catch (error) {
      console.error('Error updating visit:', error);
      alert('There was an error updating the visit.');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit Patient Visit
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
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={symptom}
                      onChange={(e) => handleChange(index, e.target.value, setSymptoms)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveField(index, setSymptoms)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField(setSymptoms)}
                  className="mt-2 text-blue-500 hover:text-blue-700"
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
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={disease}
                      onChange={(e) => handleChange(index, e.target.value, setDiseases)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveField(index, setDiseases)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField(setDiseases)}
                  className="mt-2 text-blue-500 hover:text-blue-700"
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
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={medicine}
                      onChange={(e) => handleChange(index, e.target.value, setMedicines)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveField(index, setMedicines)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField(setMedicines)}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  Add Medicine
                </button>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Remarks
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded bg-primary py-3 px-5 text-white hover:bg-opacity-90"
              >
                Update Visit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVisit;
 