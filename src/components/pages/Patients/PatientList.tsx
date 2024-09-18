import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`https://dr-harish-kawatra.onrender.com/api/v1/patients`, {
          params: { page: currentPage, limit: patientsPerPage, search: searchTerm },
        });
        setPatients(response.data.patients);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [currentPage, patientsPerPage, searchTerm]);

  const handleDelete = async (id: Number) => {
    try {
      await axios.delete(`https://dr-harish-kawatra.onrender.com/api/v1/patients/${id}`);
      setPatients(patients.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleView = (id: Number) => {
    navigate(`/patients/${id}/records`);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 1) return null;

    // First page button
    pages.push(
      <button
        key="first"
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 border rounded"
      >
        &lt;
      </button>
    );

    // Show first two pages
    if (currentPage > 3) {
      pages.push(
        <button
          key={1}
          onClick={() => paginate(1)}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'}`}
        >
          1
        </button>
      );
      pages.push(<span key="ellipsis1" className="mx-1">...</span>);
    }

    // Show range of pages around the current page
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === i
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'}`}
        >
          {i}
        </button>
      );
    }

    // Ellipsis and last page button
    if (currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis2" className="mx-1">...</span>);
      pages.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'}`}
        >
          {totalPages}
        </button>
      );
    }

    // Next page button
    pages.push(
      <button
        key="last"
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 border rounded"
      >
        &gt;
      </button>
    );

    return pages;
  };

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
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{patient.name}</h5>
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
                      onClick={() => handleView(patient.id)}
                    >
                      <FaEye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
