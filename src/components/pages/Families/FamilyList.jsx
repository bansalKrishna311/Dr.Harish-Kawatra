import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FamilyList = () => {
  const [families, setFamilies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/families');
        setFamilies(response.data);
      } catch (error) {
        console.error('Error fetching families:', error);
      }
    };

    fetchFamilies();
  }, []);

  const handleViewClick = (id) => {
    navigate(`/families/family-records/${id}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Family Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {families.map((family) => (
              <tr key={family._id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {family.name}
                  </h5>
                  <ul className="ml-5 list-disc">
                    {family.patients.map((patient) => (
                      <li key={patient._id} className="text-sm text-gray-600 dark:text-gray-400">
                        {patient.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3">
                    {/* Edit Icon */}
                    <button
                      aria-label="Edit"
                      className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded"
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
                      onClick={() => handleViewClick(family._id)}
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FamilyList;
