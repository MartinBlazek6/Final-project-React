"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Use this for Next.js 13 or later

interface Parent {
  parentId: number;
  parentName: string;
  parentSurname: string;
  parentEmail: string;
  parentPhone: string;
  parentFullName: string;
}

const ParentsTable: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const parentsPerPage = 10;

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await fetch("https://edupage.onrender.com/api/parent");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setParents(data);
      } catch (error) {
        setError("Failed to fetch parent data.");
        console.error("Failed to fetch parent data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, []);

  // Filter parents based on search query
  const filteredParents = parents.filter((parent) =>
    parent.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.parentSurname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.parentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.parentPhone.includes(searchQuery)
  );

  // Calculate the indexes of the first and last parent for the current page
  const indexOfLastParent = currentPage * parentsPerPage;
  const indexOfFirstParent = indexOfLastParent - parentsPerPage;

  // Get the parents to be displayed on the current page
  const currentParents = filteredParents.slice(indexOfFirstParent, indexOfLastParent);

  // Calculate total pages
  const totalPages = Math.ceil(filteredParents.length / parentsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleGoToMainPage = () => {
    router.push('/'); // Redirect to the main page
  };


  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto bg-gray-900 text-white p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by parent name, surname, email, or phone"
          className="p-2 w-full rounded bg-gray-800 text-white border border-gray-600"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
        />
      </div>

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border-b border-gray-700 md:border-none md:table-row">
            <th className="p-2 text-left font-medium text-gray-400 md:table-cell">ID</th>
            <th className="p-2 text-left font-medium text-gray-400 md:table-cell">Full Name</th>
            <th className="p-2 text-left font-medium text-gray-400 md:table-cell">Email</th>
            <th className="p-2 text-left font-medium text-gray-400 md:table-cell">Phone</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {currentParents.map((parent) => (
            <tr key={parent.parentId} className="border-b border-gray-700 md:border-none md:table-row">
              <td className="p-2 md:table-cell">{parent.parentId}</td>
              <td className="p-2 md:table-cell">{parent.parentFullName}</td>
              <td className="p-2 md:table-cell">{parent.parentEmail}</td>
              <td className="p-2 md:table-cell">{parent.parentPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-3 mx-2 rounded"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-white mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-3 mx-2 rounded"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
            {/* Button to redirect to the main page */}
            <div className="flex justify-center mt-4">
        <button
          onClick={handleGoToMainPage}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Main Page
        </button>
      </div>
    </div>
  );
};

export default ParentsTable;
