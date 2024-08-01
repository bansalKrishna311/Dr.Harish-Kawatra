import { useState } from 'react';
import SelectGroupOne from '../Forms/SelectGroup/SelectGroupOne'; // Make sure this import path is correct

const AddPatient = () => {
  const [symptoms, setSymptoms] = useState<string[]>(['']);
  const [diseases, setDiseases] = useState<string[]>(['']);
  const [medicines, setMedicines] = useState<string[]>(['']);
  const [historyDiseases, setHistoryDiseases] = useState<string[]>(['']);
  const [historyMedicines, setHistoryMedicines] = useState<string[]>(['']);
  const [historyRemarks, setHistoryRemarks] = useState<string>('');

  const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const handleRemoveField = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.map((item, i) => (i === index ? value : item)));
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
          <form action="#">
            <div className="p-6.5">
              {/* Existing Fields */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Gender
                </label>
                <SelectGroupOne />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Date of Birth
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
              <div className="mb-6">
              <label className="mb-3 block text-black dark:text-white">
               Add Lab Reports
              </label>
              <input
                type="file"
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90 focus:outline-none">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-9">
        {/* Patient History Form */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Patient History
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            {/* Disease Input */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Disease Name
              </label>
              {historyDiseases.map((disease, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={disease}
                    onChange={(e) => handleChange(index, e.target.value, setHistoryDiseases)}
                    placeholder="Disease Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index, setHistoryDiseases)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField(setHistoryDiseases)}
                className="text-primary hover:underline"
              >
                + Add Disease
              </button>
            </div>

            {/* Medicine Input */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Medicine Name
              </label>
              {historyMedicines.map((medicine, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={medicine}
                    onChange={(e) => handleChange(index, e.target.value, setHistoryMedicines)}
                    placeholder="Medicine Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index, setHistoryMedicines)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField(setHistoryMedicines)}
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
                rows={4}
                value={historyRemarks}
                onChange={(e) => setHistoryRemarks(e.target.value)}
                placeholder="Write any Remarks"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="mb-3 block text-black dark:text-white">
               Add Lab Reports
              </label>
              <input
                type="file"
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90 focus:outline-none">
              Save History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
