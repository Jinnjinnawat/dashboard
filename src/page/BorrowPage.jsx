import DataTableDashboard from "../components/DataTableDashboard.jsx"

// ✅ ย้ายออกมานอก function
const COLUMNS = [
  { key: "BorrowID",                 label: "รหัสการยืม" },
  { key: "asste.SerialNumber",       label: "Serial Number" },
  { key: "asste.Brand",              label: "ยี่ห้อ" },
  { key: "asste.Model",              label: "รุ่น" },
  { key: "location.LocationName",    label: "Location" },
  { key: "department.DepartmentName", label: "แผนก" },
  { key: "contract.ContractNo",      label: "สัญญา" },
  { key: "type.Typename",      label: "ประเภท" },
  { key: "Status",                   label: "สถานะ" },
]

export default function BorrowPage() {
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
  )
}