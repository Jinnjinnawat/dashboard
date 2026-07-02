const STATUS_STYLES = {
  สำเร็จ: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  กำลังดำเนินการ: "bg-accent-50 text-accent-700 ring-accent-600/20",
  รอดำเนินการ: "bg-amber-50 text-amber-700 ring-amber-600/20",
  ยกเลิก: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "bg-ink-400/10 text-ink-500 ring-ink-400/20";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
