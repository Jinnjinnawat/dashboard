import { useMemo, useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  ArrowUpDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

import ActionMenu  from "./ActionMenu";
import EditModal   from "./EditModal";
import DeleteModal from "./DeleteModal";



const PAGE_SIZE = 8;

const BRAND_OPTIONS = ["ทั้งหมด"];

export default function DataTable() {
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [brandFilter, setBrand] = useState("ทั้งหมด");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("NotebookID");
  const [sortDesc, setSortDesc] = useState(false);
  const [menuRowId, setMenuRowId] = useState(null); // _id ของแถวที่เปิด dropdown
  const [editTarget, setEditTarget] = useState(null); // notebook ที่จะแก้ไข
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:5000/api/notebook")
      .then((res) => {
        setNotebooks(res.data);
      })
      .catch((err) => {
        setError(err.message || "ไม่สามารถดึงข้อมูลได้");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // ---- callback หลัง save ----
  const handleSaved = (updated) => {
    setNotebooks((prev) =>
      prev.map((n) => (n._id === updated._id ? updated : n))
    );
  };

  // ---- callback หลัง delete ----
  const handleDeleted = (deletedId) => {
    setNotebooks((prev) => prev.filter((n) => n._id !== deletedId));
  };

  // ---- แบรนด์ที่มีในข้อมูลจริง (dynamic) ----
  const brandOptions = useMemo(() => {
    const brands = [...new Set(notebooks.map((n) => n.Brand).filter(Boolean))].sort();
    return ["ทั้งหมด", ...brands];
  }, [notebooks]);

  // ---- กรอง + เรียง ----
  const filtered = useMemo(() => {
    let rows = notebooks.filter((row) => {
      const q = query.toLowerCase();
      const matchesQuery =
        (row.NotebookID || "").toLowerCase().includes(q) ||
        (row.SerialNumber || "").toLowerCase().includes(q) ||
        (row.Brand || "").toLowerCase().includes(q) ||
        (row.Model || "").toLowerCase().includes(q) ||
        (row.LocationID || "").toLowerCase().includes(q) ||
        (row.ContractID || "").toLowerCase().includes(q);
      const matchesBrand =
        brandFilter === "ทั้งหมด" || row.Brand === brandFilter;
      return matchesQuery && matchesBrand;
    });

    rows = [...rows].sort((a, b) => {
      const va = (a[sortField] || "").toString().toLowerCase();
      const vb = (b[sortField] || "").toString().toLowerCase();
      return sortDesc ? vb.localeCompare(va, "th") : va.localeCompare(vb, "th");
    });

    return rows;
  }, [notebooks, query, brandFilter, sortField, sortDesc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSort = (field) => {
    if (sortField === field) setSortDesc((v) => !v);
    else { setSortField(field); setSortDesc(false); }
  };

  const updateQuery = (v) => { setQuery(v); setPage(1); };
  const updateBrand = (v) => { setBrand(v); setPage(1); };

  // ---- column header helper ----
  const SortTh = ({ field, label, className = "" }) => (
    <th className={`px-5 py-3 font-medium ${className}`}>
      <button
        onClick={() => handleSort(field)}
        className="flex items-center gap-1 hover:text-ink-700 transition-colors"
      >
        {label}
        <ArrowUpDown
          size={12}
          strokeWidth={2}
          className={sortField === field ? "text-accent-500" : ""}
        />
      </button>
    </th>
  );

  // ---- render states ----
  const renderBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={7} className="px-5 py-16 text-center">
            <div className="flex flex-col items-center gap-2 text-ink-400">
              <Loader2 size={24} strokeWidth={1.8} className="animate-spin text-accent-500" />
              <p className="text-sm">กำลังโหลดข้อมูล...</p>
            </div>
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={7} className="px-5 py-16 text-center">
            <div className="flex flex-col items-center gap-2 text-rose-500">
              <AlertCircle size={22} strokeWidth={1.8} />
              <p className="text-sm font-medium">เกิดข้อผิดพลาด</p>
              <p className="text-xs text-ink-400">{error}</p>
            </div>
          </td>
        </tr>
      );
    }

    if (paginated.length === 0) {
      return (
        <tr>
          <td colSpan={7} className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-ink-700">ไม่พบข้อมูลที่ตรงกับการค้นหา</p>
            <p className="text-xs text-ink-400 mt-1">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
          </td>
        </tr>
      );
    }

    return paginated.map((row) => (
      <tr
        key={row.NotebookID}
        className="border-b border-surface-border last:border-0 hover:bg-surface/60 transition-colors"
      >
        <td className="px-5 py-3.5">
          <span className="font-mono text-[13px] text-ink-700">{row.NotebookID || "-"}</span>
        </td>
        <td className="px-5 py-3.5">
          <span className="font-mono text-[13px] text-ink-500">{row.SerialNumber || "-"}</span>
        </td>
        <td className="px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-950/[0.06] flex items-center justify-center font-display text-[11px] font-semibold text-navy-900 shrink-0">
              {(row.Brand || "?").slice(0, 2).toUpperCase()}
            </div>
            <span className="font-medium text-ink-900">{row.Brand || "-"}</span>
          </div>
        </td>
        <td className="px-5 py-3.5 text-ink-700">{row.Model || "-"}</td>
        <td className="px-5 py-3.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent-50 text-accent-700 text-xs font-medium ring-1 ring-inset ring-accent-600/20">
            {row.LocationID || "-"}
          </span>
        </td>
        <td className="px-5 py-3.5">
          <span className="font-mono text-[13px] text-ink-500">{row.ContractID || "-"}</span>
        </td>
        <td className="px-5 py-3.5 text-right">
          <div className="relative inline-block">
            <button
              aria-label="ตัวเลือกเพิ่มเติม"
              onClick={() => setMenuRowId(menuRowId === row._id ? null : row._id)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${menuRowId === row._id
                  ? "bg-surface text-ink-700 border border-surface-border"
                  : "text-ink-400 hover:text-ink-700 hover:bg-surface"
                }`}
            >
              <MoreHorizontal size={16} strokeWidth={1.8} />
            </button>

            {menuRowId === row._id && (
              <ActionMenu
                onEdit={() => setEditTarget(row)}
                onDelete={() => setDeleteTarget(row)}
                onClose={() => setMenuRowId(null)}
              />
            )}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="bg-surface-card border border-surface-border rounded-2xl shadow-card overflow-hidden">
        {/* แถบเครื่องมือ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-surface-border">
          <div>
            <h2 className="font-display font-semibold text-ink-900">รายการ Notebook</h2>
            <p className="text-sm text-ink-500 mt-0.5">
              {loading ? "กำลังโหลด..." : `ทั้งหมด ${filtered.length} รายการ`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* ช่องค้นหา */}
            <div className="relative">
              <Search
                size={15}
                strokeWidth={2}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
                placeholder="ค้นหา ID, Serial, Brand, Model..."
                className="w-full sm:w-64 bg-surface border border-surface-border rounded-lg pl-9 pr-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-white transition-colors"
              />
            </div>

            {/* กรองแบรนด์ */}
            <div className="relative">
              <select
                value={brandFilter}
                onChange={(e) => updateBrand(e.target.value)}
                className="appearance-none bg-surface border border-surface-border rounded-lg pl-8 pr-8 py-2 text-sm text-ink-700 cursor-pointer focus:bg-white transition-colors"
              >
                {brandOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <Filter
                size={14}
                strokeWidth={2}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
              />
            </div>

            <button className="flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium rounded-lg px-3.5 py-2 transition-colors whitespace-nowrap">
              <Plus size={15} strokeWidth={2.2} />
              เพิ่ม Notebook
            </button>
          </div>
        </div>

        {/* ตาราง */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink-400 border-b border-surface-border">
                <SortTh field="NotebookID" label="Notebook ID" />
                <SortTh field="SerialNumber" label="Serial Number" />
                <SortTh field="Brand" label="Brand" />
                <SortTh field="Model" label="Model" />
                <SortTh field="LocationID" label="Location" />
                <SortTh field="ContractID" label="Contract" />
                <th className="px-5 py-3 font-medium text-right"> </th>
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
              {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, filtered.length)}
            </span>{" "}
            จาก <span className="font-medium text-ink-700">{filtered.length}</span> รายการ
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-border text-ink-500 disabled:opacity-40 hover:text-ink-900 hover:border-ink-400/40 transition-colors"
            >
              <ChevronLeft size={15} strokeWidth={2} />
            </button>
            <span className="text-xs font-mono text-ink-500 px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-border text-ink-500 disabled:opacity-40 hover:text-ink-900 hover:border-ink-400/40 transition-colors"
            >
              <ChevronRight size={15} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
      <EditModal
        notebook={editTarget}
        onClose={() => setEditTarget(null)}
        onSaved={handleSaved}
      />
      <DeleteModal
        notebook={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDeleted={handleDeleted}
      />
    </>
  );
}
