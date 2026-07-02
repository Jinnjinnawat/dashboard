import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({ label, value, delta, trend = "up", icon: Icon }) {
  const isUp = trend === "up";
  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-5 shadow-card">
      <div className="flex items-start justify-between">
        <p className="text-sm text-ink-500 font-medium">{label}</p>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
            <Icon size={15} strokeWidth={1.8} className="text-accent-600" />
          </div>
        )}
      </div>
      <p className="font-display text-2xl font-semibold text-ink-900 mt-3 tabular-nums">
        {value}
      </p>
      {delta && (
        <div className="flex items-center gap-1 mt-2">
          <span
            className={`flex items-center gap-0.5 text-xs font-medium font-mono ${
              isUp ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isUp ? (
              <ArrowUpRight size={13} strokeWidth={2} />
            ) : (
              <ArrowDownRight size={13} strokeWidth={2} />
            )}
            {delta}
          </span>
          <span className="text-xs text-ink-400">เทียบกับเดือนก่อน</span>
        </div>
      )}
    </div>
  );
}
