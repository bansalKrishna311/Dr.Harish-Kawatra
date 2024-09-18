import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FamilyList = () => {
  const [families, setFamilies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleEditClick = (id) => {
    navigate(`/families/edit/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/families/${id}`);
      setFamilies(families.filter((family) => family._id !== id));
    } catch (error) {
      console.error('Error deleting family:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFamilies = families.filter((family) =>
    family.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search families..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded dark:border-strokedark dark:bg-boxdark dark:text-white w-full"
        />
      </div>

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
            {filteredFamilies.map((family) => (
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
                    <button
                      aria-label="Edit"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleEditClick(family._id)}
                    >
                      <FaEdit className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button
                      aria-label="Delete"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleDeleteClick(family._id)}
                    >
                      <FaTrash className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button
                      aria-label="View"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleViewClick(family._id)}
                    >
                      <FaEye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
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
