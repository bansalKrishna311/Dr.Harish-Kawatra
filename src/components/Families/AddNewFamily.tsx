import { useState } from 'react';
import MultiSelect from '../Forms/MultiSelect';

const AddNewFamily = () => {
  const [familyName, setFamilyName] = useState('');
  const [remarks, setRemarks] = useState('');

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="w-full">
        {/* Add New Family Form */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add New Family
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              {/* Family Name Field */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Family Name
                </label>
                <input
                  type="text"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  placeholder="Family Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* MultiSelect Component for Patients */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Patients
                </label>
                <MultiSelect id="multiSelect" />
              </div>

              {/* Remarks Field */}
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Remarks
                </label>
                <textarea
                  rows={6}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
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

export default AddNewFamily;
