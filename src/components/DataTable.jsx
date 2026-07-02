import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
} from "lucide-react";
import axios from "axios";

const PAGE_SIZE = 8;

export default function DataTable({
  columns = [],
  apiUrl,
  title = "รายการข้อมูล",
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState(columns[0]?.key || "");
  const [sortDesc, setSortDesc] = useState(false);

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL is missing");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(apiUrl)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.data;
        setRows(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || err.message || "ไม่สามารถดึงข้อมูลได้"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => {
    setSortField(columns[0]?.key || "");
    setPage(1);
  }, [columns]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matchedRows = rows.filter((row) => {
      if (!q) return true;

      return columns.some((col) =>
        String(row[col.key] || "")
          .toLowerCase()
          .includes(q)
      );
    });

    if (!sortField) return matchedRows;

    return [...matchedRows].sort((a, b) => {
      const va = String(a[sortField] || "").toLowerCase();
      const vb = String(b[sortField] || "").toLowerCase();
      return sortDesc ? vb.localeCompare(va, "th") : va.localeCompare(vb, "th");
    });
  }, [rows, columns, query, sortField, sortDesc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDesc((value) => !value);
    } else {
      setSortField(field);
      setSortDesc(false);
    }
  };

  const updateQuery = (value) => {
    setQuery(value);
    setPage(1);
  };

  const renderBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={columns.length} className="px-5 py-16 text-center">
            <div className="flex flex-col items-center gap-2 text-ink-400">
              <Loader2
                size={24}
                strokeWidth={1.8}
                className="animate-spin text-accent-500"
              />
              <p className="text-sm">กำลังโหลดข้อมูล...</p>
            </div>
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={columns.length} className="px-5 py-16 text-center">
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
          <td colSpan={columns.length} className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-ink-700">ไม่พบข้อมูล</p>
            <p className="text-xs text-ink-400 mt-1">
              ลองเปลี่ยนคำค้นหาหรือตรวจสอบข้อมูลในฐานข้อมูล
            </p>
          </td>
        </tr>
      );
    }

    return paginated.map((row, index) => (
      <tr
        key={row._id || row[columns[0]?.key] || index}
        className="border-b border-surface-border last:border-0 hover:bg-surface/60 transition-colors"
      >
        {columns.map((col) => (
          <td key={col.key} className="px-5 py-3.5 text-ink-700">
            {row[col.key] || "-"}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl shadow-card overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-surface-border">
        <div>
          <h2 className="font-display font-semibold text-ink-900">{title}</h2>
          <p className="text-sm text-ink-500 mt-0.5">
            {loading ? "กำลังโหลด..." : `ทั้งหมด ${filtered.length} รายการ`}
          </p>
        </div>

        <div className="relative">
          <Search
            size={15}
            strokeWidth={2}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="ค้นหา..."
            className="w-full sm:w-64 bg-surface border border-surface-border rounded-lg pl-9 pr-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

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
                    <ArrowUpDown
                      size={12}
                      strokeWidth={2}
                      className={sortField === col.key ? "text-accent-500" : ""}
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-surface-border">
        <p className="text-xs text-ink-400">
          แสดง{" "}
          <span className="font-medium text-ink-700">
            {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}-
            {Math.min(currentPage * PAGE_SIZE, filtered.length)}
          </span>{" "}
          จาก <span className="font-medium text-ink-700">{filtered.length}</span>{" "}
          รายการ
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-border text-ink-500 disabled:opacity-40 hover:text-ink-900 hover:border-ink-400/40 transition-colors"
          >
            <ChevronLeft size={15} strokeWidth={2} />
          </button>
          <span className="text-xs font-mono text-ink-500 px-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-border text-ink-500 disabled:opacity-40 hover:text-ink-900 hover:border-ink-400/40 transition-colors"
          >
            <ChevronRight size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
