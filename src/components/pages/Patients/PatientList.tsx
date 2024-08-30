import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

type Patient = {
  _id: string;
  name: string;
  age: number;
  gender: string;
  createdAt: string; // Assuming createdAt is a date string or timestamp
};

type FamilyOption = {
  value: string;
  label: string;
};

const families: FamilyOption[] = [
  { value: 'Family A', label: 'Family A' },
  { value: 'Family B', label: 'Family B' },
  { value: 'Family C', label: 'Family C' },
];

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleFamilyChange = (patientId: string, selectedOption: any) => {
    setSelectedFamilies({
      ...selectedFamilies,
      [patientId]: selectedOption ? selectedOption.value : '',
    });
  };

  const handleDelete = async (patientId: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/patients/${patientId}`);
      setPatients(patients.filter(patient => patient._id !== patientId));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Sorting patients by creation date (latest first)
  const sortedPatients = [...patients]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter(patient =>
      patient.name.toLowerCase().includes(searchTerm)
    );

  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded-md dark:border-form-strokedark dark:bg-form-input dark:text-white w-full"
      />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                Patient Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Family
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients.map((patient) => (
              <tr key={patient._id}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {patient.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3">
                    <button
                      aria-label="Edit"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => navigate(`/patients/${patient._id}/edit`)}
                    >
                      <FaEdit className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button
                      aria-label="Delete"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleDelete(patient._id)}
                    >
                      <FaTrash className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button
                      aria-label="View"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => navigate(`/patients/${patient._id}/records`)}
                    >
                      <FaEye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <Select
                    options={families}
                    value={families.find(family => family.value === selectedFamilies[patient._id]) || null}
                    onChange={(option) => handleFamilyChange(patient._id, option)}
                    className="w-full dark:border-strokedark"
                    classNamePrefix="react-select"
                    isClearable
                    placeholder="Select a family"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
