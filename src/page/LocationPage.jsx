import DataTable from "../components/DataTable";

const COLUMNS = [
  { key: "LocationID", label: "Location ID" },
  { key: "LocationName", label: "Location Name" },
];

export default function LocationPage() {
  return (
    <div className="flex min-h-screen bg-surface">

      <div className="flex-1 min-w-0">

        <main className="px-5 lg:px-8 py-8">
          <DataTable
            columns={COLUMNS}
            apiUrl="http://localhost:5000/api/location"
            title="รายการ Location"
            editable={true}
            editFields={COLUMNS}
            deleteTitleKey="LocationID"
          />
        </main>
      </div>
    </div>
  );
}
