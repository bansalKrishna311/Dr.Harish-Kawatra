import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

type PatientVisit = {
  _id: string;
  visitDate: string;
  diseases: string[];
};

const PatientsRecords = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientRecords, setPatientRecords] = useState<PatientVisit[]>([]);
  const navigate = useNavigate();

  const fetchPatientRecords = async () => {
    if (patientId) {
      try {
        console.log(`Fetching records for patient ID: ${patientId}`);
        const response = await axios.get(`http://localhost:4000/api/v1/patients/${patientId}/records`);
        console.log('API Response:', response.data);
        setPatientRecords(response.data);
      } catch (error) {
        console.error('Error fetching patient records:', error);
      }
    }
  };

  useEffect(() => {
    fetchPatientRecords();
  }, [patientId]);

  const handleEdit = (visitId: string) => {
    // Navigate to the edit page with the visit ID
    navigate(`/edit-visit/${visitId}`);
  };

  const handleDelete = async (visitId: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/visits/${visitId}`);
      // Refresh the patient records after deletion
      fetchPatientRecords();
    } catch (error) {
      console.error('Error deleting visit:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">Visit Date</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Diseases</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patientRecords.length > 0 ? (
              patientRecords.map((record) => (
                <tr key={record._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {new Date(record.visitDate).toLocaleDateString()}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {record.diseases.filter(disease => disease).join(', ')}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3">
                      <button
                        aria-label="Edit"
                        className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded"
                        onClick={() => handleEdit(record._id)}
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        aria-label="Delete"
                        className="bg-red-500 hover:bg-red-700 text-white p-1 rounded"
                        onClick={() => handleDelete(record._id)}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsRecords;


