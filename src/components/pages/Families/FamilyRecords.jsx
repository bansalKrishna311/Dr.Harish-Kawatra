import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FamilyRecords = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/families/${id}`);
        setFamily(response.data);
      } catch (error) {
        console.error('Error fetching family:', error);
      }
    };

    fetchFamily();
  }, [id]);

  const handlePatientViewClick = (patientId) => {
    navigate(`/patients/${patientId}/records`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredAndSortedPatients = family?.patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  if (!family) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h3 className="font-medium text-black dark:text-white">
        Family: {family.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">Remarks: {family.remarks}</p>
      
      {/* Search and Sort Controls */}
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
        />
        <button
          onClick={handleSortToggle}
          className="px-4 py-2 bg-blue-500 dark:text-white rounded hover:bg-blue-600"
        >
          Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      <div className="max-w-full overflow-x-auto mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Patient Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedPatients?.map((patient, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {patient.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3">
                    <button
                      aria-label="View"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handlePatientViewClick(patient._id)}
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

export default FamilyRecords;
