import { useEffect, useRef } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function ActionMenu({ onEdit, onDelete, onClose }) {
  const menuRef = useRef(null);

  // ปิดเมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-4 mt-1 z-20 w-44 bg-surface-card border border-surface-border rounded-xl shadow-soft overflow-hidden"
    >
      <button
        onClick={() => { onEdit(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 hover:bg-surface transition-colors"
      >
        <Pencil size={14} strokeWidth={1.8} className="text-accent-500" />
        แก้ไขข้อมูล
      </button>

      <div className="h-px bg-surface-border mx-3" />

      <button
        onClick={() => { onDelete(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
      >
        <Trash2 size={14} strokeWidth={1.8} />
        ลบออกจากระบบ
      </button>
    </div>
  );
}
