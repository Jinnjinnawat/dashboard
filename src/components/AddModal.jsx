import { useState } from "react"
import { Loader2, Plus, X } from "lucide-react"
import axios from "axios"

export default function AddModal({ fields, apiUrl, titleLabel = "เพิ่มข้อมูล", onClose, onAdded }) {
  const [form, setForm]       = useState({})
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState(null)

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await axios.post(apiUrl, form)
      onAdded(res.data)  // ส่งข้อมูลใหม่กลับไปให้ DataTable
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || err.message || "ไม่สามารถเพิ่มข้อมูลได้")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg bg-surface-card rounded-2xl shadow-soft border border-surface-border">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
          <div>
            <h2 className="font-display font-semibold text-ink-900">{titleLabel}</h2>
            <p className="text-xs text-ink-400 mt-0.5">กรอกข้อมูลให้ครบถ้วนก่อนบันทึก</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-400 hover:text-ink-700 hover:bg-surface transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(({ key, label, placeholder, type = "text", fullWidth }) => (
            <div key={key} className={fullWidth ? "sm:col-span-2" : ""}>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">
                {label}
              </label>
              <input
                type={type}
                value={form[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder || label}
                className="w-full bg-surface border border-surface-border rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-white focus:border-accent-400 focus:ring-2 focus:ring-accent-500/10 transition-all outline-none"
              />
            </div>
          ))}
        </div>

        {error && (
          <p className="px-6 pb-3 text-xs text-rose-600">{error}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-surface-border">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-sm font-medium text-ink-600 hover:bg-surface border border-surface-border transition-colors disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent-500 hover:bg-accent-600 text-white transition-colors disabled:opacity-60"
          >
            {saving
              ? <Loader2 size={14} strokeWidth={2} className="animate-spin" />
              : <Plus size={14} strokeWidth={2.2} />
            }
            {saving ? "กำลังบันทึก..." : "เพิ่มข้อมูล"}
          </button>
        </div>

      </div>
    </div>
  )
}