import { Loader2, Trash2, X } from "lucide-react"

export default function DeleteModal({
  deletingRow,
  deleteTitleKey,
  deleting,
  modalError,
  onClose,
  onConfirm,
}) {
  if (!deletingRow) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-surface-card rounded-2xl shadow-soft border border-surface-border">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="font-display font-semibold text-ink-900">ยืนยันการลบ</h2>
            <p className="text-sm text-ink-500 mt-1 leading-relaxed">
              ต้องการลบข้อมูล{" "}
              <span className="font-mono font-medium text-ink-700">
                {deletingRow[deleteTitleKey] || deletingRow._id}
              </span>{" "}
              ออกจากระบบ?
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-400 hover:text-ink-700 hover:bg-surface transition-colors shrink-0 ml-2"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {modalError && (
          <p className="px-6 pb-3 text-xs text-rose-600">{modalError}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 pb-5">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-ink-600 hover:bg-surface border border-surface-border transition-colors disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white transition-colors disabled:opacity-60"
          >
            {deleting
              ? <Loader2 size={14} strokeWidth={2} className="animate-spin" />
              : <Trash2 size={14} strokeWidth={1.8} />
            }
            {deleting ? "กำลังลบ..." : "ลบข้อมูล"}
          </button>
        </div>
      </div>
    </div>
  )
}