import { FaEdit } from 'react-icons/fa';
import React from 'react';

// Define the patient data type
type Patient = {
  patientID: number;
  patientName: string;
  diseaseName: string;
  date: string;
};

// Sample patient data
const patientData: Patient[] = [
  { patientID: 378, patientName: 'MRS. PUJA KONDAL', diseaseName: '', date: '2022-08-23' },
  { patientID: 378, patientName: 'MRS. PUJA KONDAL', diseaseName: '', date: '2022-08-31' },
  { patientID: 378, patientName: 'MRS. PUJA KONDAL', diseaseName: 'COUGH, COLD, FEVER', date: '2022-09-08' },
];

const PatientRecords = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">PatientID</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Patient Name</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Disease Name</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Date</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{patient.patientID}</td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{patient.patientName}</td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{patient.diseaseName}</td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{patient.date}</td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3">
                    <button aria-label="Edit" className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded">
                      <FaEdit className="w-4 h-4" />
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

export default PatientRecords;
