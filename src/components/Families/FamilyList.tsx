import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const packageData = [
  {
    name: 'Family 1',
    invoiceDate: 'Jan 13, 2023', // This can be removed if no longer needed
  },
  {
    name: 'Family 2',
    invoiceDate: 'Jan 13, 2023',
  },
  {
    name: 'Family 3',
    invoiceDate: 'Jan 13, 2023',
  },
  {
    name: 'Family 4',
    invoiceDate: 'Jan 13, 2023',
  },
];

const FamilyList = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the view button click
  const handleViewClick = () => {
    navigate('/patients/patient-records'); // Redirect to the patient records page
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
            {packageData.map((packageItem, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h5>
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
                      onClick={handleViewClick} // Handle the view button click
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
