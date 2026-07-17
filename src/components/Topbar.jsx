import { Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-surface-card/95 backdrop-blur border-b border-surface-border">
      <div className="flex items-center justify-between gap-4 px-6 pl-14  lg:px-8 h-16">
        {/* ช่องค้นหาแบบรวม (global) */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            strokeWidth={2}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="text"
            placeholder="ค้นหาในระบบ..."
            className="w-full bg-surface border border-surface-border rounded-lg pl-9 pr-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="การแจ้งเตือน"
            className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-surface-border text-ink-500 hover:text-ink-900 hover:border-ink-400/40 transition-colors"
          >
            <Bell size={16} strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent-500" />
          </button>

          <div className="h-8 w-px bg-surface-border" />

          <button className="flex items-center gap-2 group">
            
            <ChevronDown
              size={14}
              strokeWidth={2}
              className="text-ink-400 group-hover:text-ink-700 transition-colors"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
