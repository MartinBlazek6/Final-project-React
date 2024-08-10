"use client"; // This directive must be at the top

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Use this for Next.js 13 or later

interface Teacher {
  teacherId: number;
  teacherName: string;
  teacherSurname: string;
  teacherFullName: string;
}

const TeachersTable: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter(); // Initialize the router

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const teachersPerPage = 10;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("https://edupage.onrender.com/api/teacher");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data: Teacher[] = await response.json();

        console.log("Fetched teachers data:", data); // Debugging: Log the fetched data

        setTeachers(data);
      } catch (error) {
        setError("Failed to fetch teacher data.");
        console.error("Failed to fetch teacher data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.teacherSurname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.teacherFullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the indexes of the first and last teacher for the current page
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;

  // Get the teachers to be displayed on the current page
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  // Calculate total pages
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

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
          placeholder="Search by teacher name or surname"
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
            <th className="p-2 text-left font-medium text-gray-400 md:table-cell">Name</th>
            <th className="p-2 text-left font-medium text-gray-400 md:table-cell">Surname</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {currentTeachers.map((teacher) => (
            <tr key={teacher.teacherId} className="border-b border-gray-700 md:border-none md:table-row">
              <td className="p-2 md:table-cell">{teacher.teacherId}</td>
              <td className="p-2 md:table-cell">{teacher.teacherName}</td>
              <td className="p-2 md:table-cell">{teacher.teacherSurname}</td>
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

export default TeachersTable;
