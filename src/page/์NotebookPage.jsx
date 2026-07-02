import DataTable from "../components/DataTable"


const COLUMNS = [
    { key: "NotebookID", label: "Notebook ID" },
    { key: "SerialNumber", label: "Serial Number" },
    { key: "Brand", label: "Brand" },
    { key: "Model", label: "Model" },
    { key: "LocationID", label: "Location" },
    { key: "ContractID", label: "Contract" },
]

export default function NotebookPage() {
    return (

        <div className="flex min-h-screen bg-surface">
            
            <div className="flex-1 min-w-0">
              
                <main className="px-5 lg:px-8 py-8">
                    <DataTable
                        columns={COLUMNS}
                        apiUrl="http://localhost:5000/api/notebook"
                        title="รายการ Notebook"
                    />
                </main>
            </div>
        </div>
    )
}