import React from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Sample family member data
const familyMembers = [
  { id: '1', name: 'MRS.MANNAT DHIMAN' },
  { id: '2', name: 'DRISHTI DHIMAN' },
  { id: '3', name: 'MRS.MEENA DHIMAN' },
  { id: '4', name: 'MRS.ANU DHIMAN' },
  { id: '5', name: 'AMANAT DHIMAN' },
];

const FamilyRecords = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h2 className="text-center text-2xl font-semibold my-4 dark:text-white">
          ANIL DHIMAN ONKAR VIHAR
        </h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">Family Member Name</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {familyMembers.map((member, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{member.name}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3">
                    <button
                      aria-label="View"
                      className="bg-yellow-500 hover:bg-yellow-700 text-white p-1 rounded"
                      onClick={() => navigate(`/family/${member.id}`)}
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      aria-label="Delete"
                      className="bg-red-500 hover:bg-red-700 text-white p-1 rounded"
                    >
                      <FaTrash className="w-4 h-4" />
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
