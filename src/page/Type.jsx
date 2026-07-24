import DataTable from "../components/DataTable"

const COLUMNS = [
  { key: "Type",     label: "รหัสประเภท" },
  { key: "Typename", label: "ชื่อประเภท" },
]

const EDIT_FIELDS = [
  { key: "Type",     label: "รหัสประเภท", placeholder: "TYPE-XXX" },
  { key: "Typename", label: "ชื่อประเภท", placeholder: "ชื่อประเภท", fullWidth: true },
]

const ADD_FIELDS = [
  { key: "Type",     label: "รหัสประเภท", autoGenerate: true, prefix: "TYPE", hidden: true },
  { key: "Typename", label: "ชื่อประเภท", placeholder: "ชื่อประเภท", fullWidth: true },
]

export default function TypePage() {
  return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex-1 min-w-0">
        <main className="px-5 lg:px-8 py-8">
          <DataTable
            columns={COLUMNS}
            apiUrl="http://localhost:5000/api/type"
            title="รายการประเภท"
            editable={true}
            editFields={EDIT_FIELDS}
            addFields={ADD_FIELDS}
            deleteTitleKey="Type"
          />
        </main>
      </div>
    </div>
  )
}