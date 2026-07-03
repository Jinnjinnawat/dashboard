import DataTable from "../components/DataTable";

const COLUMNS = [
  { key: "ContractID", label: "Contract ID" },
  { key: "ContractNo", label: "Contract No" },
  { key: "Vendor", label: "Vendor" },
  { key: "StartDate", label: "Start Date" },
  { key: "EndDate", label: "End Date" },
];

const EDIT_FIELDS = [
  { key: "ContractID", label: "Contract ID", placeholder: "CTR-XXXX" },
  { key: "ContractNo", label: "Contract No", placeholder: "เลขที่สัญญา" },
  { key: "Vendor", label: "Vendor", placeholder: "ชื่อผู้ขาย", fullWidth: true },
  { key: "StartDate", label: "Start Date", type: "date" },
  { key: "EndDate", label: "End Date", type: "date" },
];
// เพิ่ม ADD_FIELDS ก่อน export default
const ADD_FIELDS = [
  { key: "ContractID", label: "Contract ID", placeholder: "CTR-XXXX" },
  { key: "ContractNo", label: "Contract No", placeholder: "เลขที่สัญญา" },
  { key: "Vendor",     label: "Vendor",      placeholder: "ชื่อผู้ขาย", fullWidth: true },
  { key: "StartDate",  label: "Start Date",  type: "date" },
  { key: "EndDate",    label: "End Date",    type: "date" },
]

export default function ContractPage() {
  return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex-1 min-w-0">
        <main className="px-5 lg:px-8 py-8">
          <DataTable
            columns={COLUMNS}
            editFields={EDIT_FIELDS}
            apiUrl="http://localhost:5000/api/notebookcontract"
            title="รายการ Contract"
            editable={true}
             addFields={ADD_FIELDS}
            deleteTitleKey="ContractID"
          />
        </main>
      </div>
    </div>
  );
}
