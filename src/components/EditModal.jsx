import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import axios from "axios";

const FIELDS = [
  { key: "NotebookID",   label: "Notebook ID",   placeholder: "NB-XXXX" },
  { key: "SerialNumber", label: "Serial Number",  placeholder: "SN-XXXXXXXXXX" },
  { key: "Brand",        label: "Brand",          placeholder: "Dell, HP, Lenovo..." },
  { key: "Model",        label: "Model",          placeholder: "Latitude 5540" },
  { key: "LocationID",   label: "Location ID",    placeholder: "LOC-XXX" },
  { key: "ContractID",   label: "Contract ID",    placeholder: "CTR-XXXX" },
];

export default function EditModal({ notebook, onClose, onSaved }) {
  const [form, setForm]       = useState({});
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState(null);

 
  useEffect(() => {
    if (notebook) {
      setForm({
        NotebookID:   notebook.NotebookID   || "",
        SerialNumber: notebook.SerialNumber || "",
        Brand:        notebook.Brand        || "",
        Model:        notebook.Model        || "",
        LocationID:   notebook.LocationID   || "",
        ContractID:   notebook.ContractID   || "",
      });
    }
  }, [notebook]);

  if (!notebook) return null;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/notebook/${notebook._id}`,
        form
      );
      onSaved(res.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "บันทึกไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setSaving(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface-card rounded-2xl shadow-soft border border-surface-border animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
          <div>
            <h2 className="font-display font-semibold text-ink-900">แก้ไขข้อมูล Notebook</h2>
            <p className="text-xs text-ink-400 mt-0.5 font-mono">{notebook.NotebookID}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-400 hover:text-ink-700 hover:bg-surface transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          {FIELDS.map(({ key, label, placeholder }) => (
            <div key={key} className={key === "Model" ? "col-span-2" : ""}>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">
                {label}
              </label>
              <input
                type="text"
                value={form[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
                className="w-full bg-surface border border-surface-border rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-white focus:border-accent-400 focus:ring-2 focus:ring-accent-500/10 transition-all outline-none"
              />
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="px-6 pb-3 text-xs text-rose-600">{error}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-surface-border">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-sm font-medium text-ink-600 hover:bg-surface border border-surface-border transition-colors disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent-500 hover:bg-accent-600 text-white transition-colors disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={14} strokeWidth={2} className="animate-spin" />
            ) : (
              <Save size={14} strokeWidth={2} />
            )}
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
}
