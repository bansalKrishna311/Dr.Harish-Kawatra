import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MultiSelect from '../../SelectGroup/MultiSelect';
import { useParams, useNavigate } from 'react-router-dom';

const AddOrEditFamily = () => {
  const [name, setName] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedPatients, setSelectedPatients] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const fetchFamily = async () => {
        try {
          const response = await axios.get(`https://dr-harish-kawatra.onrender.com/api/families/${id}`);
          const family = response.data;
          setName(family.name);
          setRemarks(family.remarks);
          setSelectedPatients(family.patients.map((patient) => patient._id));
        } catch (error) {
          console.error('Error fetching family:', error);
        }
      };

      fetchFamily();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const familyData = {
        name,
        patients: selectedPatients,
        remarks,
      };

      if (isEdit) {
        await axios.put(`https://dr-harish-kawatra.onrender.com/api/families/${id}`, familyData);
        alert('Family updated successfully');
      } else {
        await axios.post('https://dr-harish-kawatra.onrender.com/api/families', familyData);
        alert('Family added successfully');
      }

      navigate('/families');
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'adding'} family:`, error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {isEdit ? 'Edit Family' : 'Add New Family'}
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Family Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Family Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Patients
                </label>
                <MultiSelect
                  selectedPatients={selectedPatients}
                  setSelectedPatients={setSelectedPatients}
                />
              </div>

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

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90 focus:outline-none"
              >
                {isEdit ? 'Update' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditFamily;
