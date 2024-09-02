import React, { useState, useEffect } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FamilyRecords = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState(null);

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const response = await axios.get(`/api/families/${id}`);
        setFamily(response.data);
      } catch (error) {
        console.error('Error fetching family:', error);
      }
    };

    fetchFamily();
  }, [id]);

  const handlePatientViewClick = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

  if (!family) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h3 className="font-medium text-black dark:text-white">
        Family: {family.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">Remarks: {family.remarks}</p>
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
            {family.patients.map((patient, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {patient.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3">
                    {/* View Icon */}
                    <button
                      aria-label="View"
                      className="bg-yellow-500 hover:bg-yellow-700 text-white p-1 rounded"
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
