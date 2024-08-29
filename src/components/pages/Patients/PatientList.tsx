import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the patient data type
type Patient = {
  _id: string;
  name: string;
  age: number;
  gender: string;
};

const families = ['Family A', 'Family B', 'Family C'];

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<Record<string, string>>({});

  // Fetch patients from the backend
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

  // Handle change in dropdown for each patient
  const handleFamilyChange = (patientId: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFamilies({
      ...selectedFamilies,
      [patientId]: event.target.value,
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Serial No.
              </th>
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
            {patients.map((patient, index) => (
              <tr key={patient._id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {index + 1} {/* Serial number starts from 1 */}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {patient.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3">
                    {/* Edit Icon */}
                    <button
  aria-label="Edit"
  className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded"
  onClick={() => navigate(`/patients/${patient._id}/edit`)}
>
  <FaEdit className="w-4 h-4" />
</button>
                    {/* Delete Icon */}
                    <button
                      aria-label="Delete"
                      className="bg-red-500 hover:bg-red-700 text-white p-1 rounded"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                    {/* View Icon */}
                    <button
                      aria-label="View"
                      className="bg-yellow-500 hover:bg-yellow-700 text-white p-1 rounded"
                      onClick={() => navigate(`/patients/${patient._id}/records`)}
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <select
                    value={selectedFamilies[patient._id] || ''}
                    onChange={(e) => handleFamilyChange(patient._id, e)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a family</option>
                    {families.map((family, index) => (
                      <option key={index} value={family}>
                        {family}
                      </option>
                    ))}
                  </select>
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
