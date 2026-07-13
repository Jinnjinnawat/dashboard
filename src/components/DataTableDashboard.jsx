import { useEffect, useMemo, useState } from "react"
import {
  AlertCircle, ArrowUpDown, ChevronLeft, ChevronRight,
  Loader2, Pencil, Search, Trash2, Plus,
} from "lucide-react"
import axios from "axios"
import EditModal from "./EditModal"
import DeleteModal from "./DeleteModal"
import AddModal from "./AddModal"

const PAGE_SIZE = 8

// ✅ helper อ่านค่า nested เช่น "location.LocationName"
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? "-"
}

export default function DataTableDashboard({
  columns = [],
  apiUrl,
  title = "รายการข้อมูล",
  editable = false,
  editFields = columns,
  deleteTitleKey = columns[0]?.key,
  addFields = [],
}) {
  const [rows, setRows]             = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [query, setQuery]           = useState("")
  const [page, setPage]             = useState(1)
  const [sortField, setSortField]   = useState(columns[0]?.key || "")
  const [sortDesc, setSortDesc]     = useState(false)
  const [showAdd, setShowAdd]       = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [deletingRow, setDeletingRow] = useState(null)
  const [form, setForm]             = useState({})
  const [modalError, setModalError] = useState(null)
  const [saving, setSaving]         = useState(false)
  const [deleting, setDeleting]     = useState(false)

  // ---- fetch ----
  useEffect(() => {
    if (!apiUrl) { setError("API URL is missing"); setLoading(false); return }
    setLoading(true); setError(null)
    axios.get(apiUrl)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.data
        setRows(Array.isArray(data) ? data : [])
      })
      .catch((err) => setError(err.response?.data?.message || err.message || "ไม่สามารถดึงข้อมูลได้"))
      .finally(() => setLoading(false))
  }, [apiUrl])

  useEffect(() => { setSortField(columns[0]?.key || ""); setPage(1) }, [columns])

  // ---- filter + sort ✅ ใช้ getNestedValue ----
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matched = rows.filter((row) =>
      !q || columns.some((col) =>
        String(getNestedValue(row, col.key)).toLowerCase().includes(q)
      )
    )
    if (!sortField) return matched
    return [...matched].sort((a, b) => {
      const va = String(getNestedValue(a, sortField)).toLowerCase()
      const vb = String(getNestedValue(b, sortField)).toLowerCase()
      return sortDesc ? vb.localeCompare(va, "th") : va.localeCompare(vb, "th")
    })
  }, [rows, columns, query, sortField, sortDesc])

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated   = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const colSpan     = columns.length + (editable ? 1 : 0)

  const handleSort = (field) => {
    if (sortField === field) setSortDesc((v) => !v)
    else { setSortField(field); setSortDesc(false) }
  }

  // ---- Edit handlers ----
  const openEdit = (row) => {
    const nextForm = {}
    editFields.forEach((f) => { nextForm[f.key] = row[f.key] || "" })
    setEditingRow(row); setForm(nextForm); setModalError(null)
  }
  const closeEdit = () => {
    if (saving) return
    setEditingRow(null); setForm({}); setModalError(null)
  }
  const saveEdit = async () => {
    if (!editingRow?._id) return
    setSaving(true); setModalError(null)
    try {
      const res = await axios.put(`${apiUrl}/${editingRow._id}`, form)
      setRows((prev) => prev.map((r) => (r._id === editingRow._id ? res.data : r)))
      setEditingRow(null); setForm({})
    } catch (err) {
      setModalError(err.response?.data?.message || err.message || "ไม่สามารถบันทึกข้อมูลได้")
    } finally { setSaving(false) }
  }

  // ---- Delete handlers ----
  const openDelete  = (row) => { setDeletingRow(row); setModalError(null) }
  const closeDelete = () => {
    if (deleting) return
    setDeletingRow(null); setModalError(null)
  }
  const confirmDelete = async () => {
    if (!deletingRow?._id) return
    setDeleting(true); setModalError(null)
    try {
      await axios.delete(`${apiUrl}/${deletingRow._id}`)
      setRows((prev) => prev.filter((r) => r._id !== deletingRow._id))
      setDeletingRow(null)
    } catch (err) {
      setModalError(err.response?.data?.message || err.message || "ไม่สามารถลบข้อมูลได้")
    } finally { setDeleting(false) }
  }

  const handleAdded = (newRow) => { setRows((prev) => [newRow, ...prev]) }

  // ---- render ----
  const renderBody = () => {
    if (loading) return (
      <tr><td colSpan={colSpan} className="px-5 py-16 text-center">
        <div className="flex flex-col items-center gap-2 text-ink-400">
          <Loader2 size={24} strokeWidth={1.8} className="animate-spin text-accent-500" />
          <p className="text-sm">กำลังโหลดข้อมูล...</p>
        </div>
      </td></tr>
    )
    if (error) return (
      <tr><td colSpan={colSpan} className="px-5 py-16 text-center">
        <div className="flex flex-col items-center gap-2 text-rose-500">
          <AlertCircle size={22} strokeWidth={1.8} />
          <p className="text-sm font-medium">เกิดข้อผิดพลาด</p>
          <p className="text-xs text-ink-400">{error}</p>
        </div>
      </td></tr>
    )
    if (paginated.length === 0) return (
      <tr><td colSpan={colSpan} className="px-5 py-12 text-center">
        <p className="text-sm font-medium text-ink-700">ไม่พบข้อมูล</p>
        <p className="text-xs text-ink-400 mt-1">ลองเปลี่ยนคำค้นหาหรือตรวจสอบข้อมูลในฐานข้อมูล</p>
      </td></tr>
    )

    return paginated.map((row, index) => (
      <tr
        key={row._id || row[columns[0]?.key] || index}
        className="border-b border-surface-border last:border-0 hover:bg-surface/60 transition-colors"
      >
        {/* ✅ ใช้ getNestedValue แสดงค่า nested */}
        {columns.map((col) => (
          <td key={col.key} className="px-5 py-3.5 text-ink-700">
            {getNestedValue(row, col.key)}
          </td>
        ))}

        {editable && (
          <td className="px-5 py-3.5">
            <div className="flex items-center justify-end gap-1.5">
              <button type="button" onClick={() => openEdit(row)}
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-surface-border text-ink-500 hover:text-accent-600 hover:border-accent-300 hover:bg-accent-50 transition-colors"
              >
                <Pencil size={14} strokeWidth={1.8} />
              </button>
              <button type="button" onClick={() => openDelete(row)}
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-surface-border text-ink-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"
              >
                <Trash2 size={14} strokeWidth={1.8} />
              </button>
            </div>
          </td>
        )}
      </tr>
    ))
  }

  return (
    <>
      <div className="bg-surface-card border border-surface-border rounded-2xl shadow-card overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-surface-border">
          <div>
            <h2 className="font-display font-semibold text-ink-900">{title}</h2>
            <p className="text-sm text-ink-500 mt-0.5">
              {loading ? "กำลังโหลด..." : `ทั้งหมด ${filtered.length} รายการ`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={15} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                placeholder="ค้นหา..."
                className="w-full sm:w-64 bg-surface border border-surface-border rounded-lg pl-9 pr-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-white transition-colors"
              />
            </div>

            {addFields.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium rounded-lg px-3.5 py-2 transition-colors whitespace-nowrap"
              >
                <Plus size={15} strokeWidth={2.2} />
                เพิ่มข้อมูล
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink-400 border-b border-surface-border">
                {columns.map((col) => (
                  <th key={col.key} className="px-5 py-3 font-medium">
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1 hover:text-ink-700 transition-colors"
                    >
                      {col.label}
                      <ArrowUpDown size={12} strokeWidth={2} className={sortField === col.key ? "text-accent-500" : ""} />
                    </button>
                  </th>
                ))}
                {editable && <th className="px-5 py-3 font-medium text-right">จัดการ</th>}
              </tr>
            </thead>
            <tbody>{renderBody()}</tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-surface-border">
          <p className="text-xs text-ink-400">
            แสดง{" "}
            <span className="font-medium text-ink-700">
              {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}-
              {Math.min(currentPage * PAGE_SIZE, filtered.length)}
            </span>{" "}
            จาก <span className="font-medium text-ink-700">{filtered.length}</span> รายการ
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((v) => Math.max(1, v - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-border text-ink-500 disabled:opacity-40 hover:text-ink-900 transition-colors"
            >
              <ChevronLeft size={15} strokeWidth={2} />
            </button>
            <span className="text-xs font-mono text-ink-500 px-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-border text-ink-500 disabled:opacity-40 hover:text-ink-900 transition-colors"
            >
              <ChevronRight size={15} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <EditModal
        editingRow={editingRow}
        editFields={editFields}
        deleteTitleKey={deleteTitleKey}
        form={form}
        saving={saving}
        modalError={modalError}
        onClose={closeEdit}
        onSave={saveEdit}
        onFormChange={(key, val) => { setForm((prev) => ({ ...prev, [key]: val })); setModalError(null) }}
      />
      <DeleteModal
        deletingRow={deletingRow}
        deleteTitleKey={deleteTitleKey}
        deleting={deleting}
        modalError={modalError}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />
      {showAdd && (
        <AddModal
          fields={addFields}
          apiUrl={apiUrl}
          titleLabel={`เพิ่ม ${title}`}
          onClose={() => setShowAdd(false)}
          onAdded={handleAdded}
        />
      )}
    </>
  )
}