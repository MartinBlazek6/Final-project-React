// pages/classrooms.tsx

import React from "react";
import ClassroomsTable from "@/components/ClassRoomsTable";

const ClassRoomsPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">ClassRooms Table</h1>
        <ClassroomsTable />
      </div>
    </main>
  );
};

export default ClassRoomsPage;
