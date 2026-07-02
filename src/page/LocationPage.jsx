import DataTable from "../components/DataTable";

const COLUMNS = [
  { key: "LocationID", label: "Location ID" },
  { key: "LocationName", label: "Location Name" },
];

export default function LocationPage() {
  return (
    <DataTable
      columns={COLUMNS}
      apiUrl="http://localhost:5000/api/location"
      title="รายการ Location"
    />
  );
}
