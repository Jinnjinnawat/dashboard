import DataTable from "../components/DataTable";

const COLUMNS = [
  { key: "NotebookID", label: "Notebook ID" },
  { key: "SerialNumber", label: "Serial Number" },
  { key: "Brand", label: "Brand" },
  { key: "Model", label: "Model" },
  { key: "LocationID", label: "Location" },
  { key: "ContractID", label: "Contract" },
];

const EDIT_FIELDS = [
  { key: "NotebookID", label: "Notebook ID", placeholder: "NB-XXXX" },
  { key: "SerialNumber", label: "Serial Number", placeholder: "SN-XXXXXXXXXX" },
  { key: "Brand", label: "Brand", placeholder: "Dell, HP, Lenovo..." },
  { key: "Model", label: "Model", placeholder: "Latitude 5540", fullWidth: true },
  { key: "LocationID", label: "Location ID", placeholder: "LOC-XXX" },
  { key: "ContractID", label: "Contract ID", placeholder: "CTR-XXXX" },
];
const ADD_FIELDS = [
  {
    key: "NotebookID",
    label: "Notebook ID",
    autoGenerate: true,
    prefix: "NB",
    hidden: true,         
  },
  { key: "SerialNumber", label: "Serial Number", placeholder: "SN-XXXXXXXXXX" },
  { key: "Brand",        label: "Brand",         placeholder: "Dell, HP, Lenovo..." },
  { key: "Model",        label: "Model",         placeholder: "Latitude 5540", fullWidth: true },
  {
    key: "LocationID",
    label: "Location",
    type: "select",                                       // ✅ dropdown
    optionsUrl: "http://localhost:5000/api/location",     // ✅ ดึงจาก API
    optionsValue: "LocationID",                           // ✅ ค่าที่จะบันทึก
    optionsLabel: "LocationName",                         // ✅ ข้อความที่แสดง
  },
  {
    key: "ContractID",
    label: "Contract",
    type: "select",                                           // ✅ dropdown
    optionsUrl: "http://localhost:5000/api/notebookcontract", // ✅ ดึงจาก API
    optionsValue: "ContractID",                               // ✅ ค่าที่จะบันทึก
    optionsLabel: "ContractNo",                               // ✅ ข้อความที่แสดง
  },
]
export default function NotebookPage() {
  return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex-1 min-w-0">
        <main className="px-5 lg:px-8 py-8">
          <DataTable
            columns={COLUMNS}
            editFields={EDIT_FIELDS}
            apiUrl="http://localhost:5000/api/notebook"
            title="รายการ Notebook"
            editable={true}
            addFields={ADD_FIELDS}
            deleteTitleKey="NotebookID"
          />
        </main>
      </div>
    </div>
  );
}
