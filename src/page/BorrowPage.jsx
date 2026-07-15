export default function BorrowPage() {
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
