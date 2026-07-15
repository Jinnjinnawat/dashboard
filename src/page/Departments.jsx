import DataTable from "../components/DataTable";

const COLUMNS = [
    {key :"DepartmentID",label:"DepartmentID"},
    {key :"DepartmentName",label:"DepartmentName"}
];
    
const EDIT_FIELDS = [
    {key :"DepartmentID",label:"DepartmentID"},
    {Key :"DepartmentName",label:"DepartmentName"}
];
  
const ADD_FIELDS = [
  {
    key: "DepartmentID",
    label: "DepartmentID",
    autoGenerate: true,
    prefix: "DP",
    readOnly: true,
    hidden: true, 
  },
   
     {key :"DepartmentName",label:"DepartmentName"}
];




export default function Departments(){
return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex-1 min-w-0">
        <main className="px-5 lg:px-8 py-8">
          <DataTable
            columns={COLUMNS}
            editFields={EDIT_FIELDS}
            apiUrl="http://localhost:5000/api/department"
            title="รายการ Department"
            editable={true}
            addFields={ADD_FIELDS}
            deleteTitleKey="DepartmentID"
          />
        </main>
      </div>
    </div>
  );
}