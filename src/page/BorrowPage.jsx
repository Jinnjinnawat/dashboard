import DataTableDashboard from "../components/DataTableDashboard.jsx";
import { useState } from "react";
export default function BorrowPage() {
  const COLUMNS = [
  { key: "BorrowID",                  label: "รหัสการยืม" },
  { key: "notebook.SerialNumber",        label: "รหัส Notebook" },
  { key: "notebook.Brand",             label: "ยี่ห้อ" },
  { key: "notebook.Model",             label: "รุ่น" },
   { key: "location.LocationName",      label: "Location" },
  { key: "department.DepartmentName",  label: "แผนก" },
  { key: "contract.ContractNo",  label: "สัญญา" },
  { key: "Status",                     label: "สถานะ" },
]
  return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex-1 min-w-0">
        <main className="px-5 lg:px-8 py-8">
                    <DataTableDashboard
                      columns={COLUMNS}
                      apiUrl="http://localhost:5000/api/borrow/full"
                      title="รายการการเช่า"
                    />
        </main>
      </div>
    </div>
  );
}
