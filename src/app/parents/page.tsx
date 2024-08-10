// pages/parents.tsx

import React from "react";
import ParentsTable from "@/components/ParentsTable";

const ParentsPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Parents Table</h1>
        <ParentsTable />
      </div>
    </main>
  );
};

export default ParentsPage;
