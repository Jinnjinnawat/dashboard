import { useState } from "react";
import { Trash2, X, Loader2, AlertTriangle } from "lucide-react";
import axios from "axios";

export default function DeleteModal({ notebook, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError]       = useState(null);

  if (!notebook) return null;

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/notebook/${notebook._id}`);
      onDeleted(notebook._id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "ลบไม่สำเร็จ กรุณาลองใหม่");
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-surface-card rounded-2xl shadow-soft border border-surface-border animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} strokeWidth={1.8} className="text-rose-600" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-ink-900">ยืนยันการลบ</h2>
              <p className="text-sm text-ink-500 mt-1 leading-relaxed">
                ต้องการลบ Notebook{" "}
                <span className="font-mono font-medium text-ink-700">
                  {notebook.NotebookID}
                </span>{" "}
                ออกจากระบบ? การดำเนินการนี้ไม่สามารถย้อนกลับได้
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-400 hover:text-ink-700 hover:bg-surface transition-colors shrink-0 ml-2"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Info row */}
        <div className="mx-6 mb-4 px-3 py-2.5 rounded-lg bg-surface border border-surface-border">
          <div className="grid grid-cols-2 gap-y-1 text-xs">
            <span className="text-ink-400">Brand</span>
            <span className="font-medium text-ink-700">{notebook.Brand || "-"}</span>
            <span className="text-ink-400">Model</span>
            <span className="font-medium text-ink-700">{notebook.Model || "-"}</span>
            <span className="text-ink-400">Serial</span>
            <span className="font-mono text-ink-700">{notebook.SerialNumber || "-"}</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="px-6 pb-3 text-xs text-rose-600">{error}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 pb-5">
          <button
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-ink-600 hover:bg-surface border border-surface-border transition-colors disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white transition-colors disabled:opacity-60"
          >
            {deleting ? (
              <Loader2 size={14} strokeWidth={2} className="animate-spin" />
            ) : (
              <Trash2 size={14} strokeWidth={2} />
            )}
            {deleting ? "กำลังลบ..." : "ลบออกจากระบบ"}
          </button>
        </div>
      </div>
    </div>
  );
}
