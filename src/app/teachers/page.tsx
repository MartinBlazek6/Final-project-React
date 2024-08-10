// pages/teachers.tsx

import React from "react";
import TeachersTable from "@/components/TeachersTable";
const TeachersPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Teachers Directory</h1>
        <TeachersTable />
      </div>
    </main>
  );
};

export default TeachersPage;
