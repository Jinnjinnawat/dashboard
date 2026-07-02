import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  Settings,
  Database,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Children, useState } from "react";

import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { key: "dashboard", label: "แดชบอร์ด", icon: LayoutDashboard, path: "/" },
  {
    key: "database", label: "ฐานข้อมูล", icon: Database, path: "/",
    children: [
      { key: "Notebook", label: "ข้อมูล Notebbok", path: "/", }
    ]
  },

  { key: "customers", label: "ลูกค้า", icon: Users },
  { key: "products", label: "สินค้า", icon: Package },
  { key: "reports", label: "รายงาน", icon: BarChart3 },
  { key: "settings", label: "ตั้งค่า", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation()
  const[openKey,setOpenKey] = useState(null)
  const toggleDropdown = (key) => {
    setOpenKey((prev) => (prev === key ? null : key))
  }
  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-navy-950 text-white shrink-0 h-screen sticky top-0">
      {/* โลโก้ */}
      <div className="flex items-center gap-3 px-6 py-7">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
          <span className="font-display font-semibold text-sm text-white">OS</span>
        </div>
        <div className="leading-tight">
          <p className="font-display font-semibold text-sm tracking-wide">Orbit Suite</p>
          <p className="text-[11px] text-white/40">ระบบจัดการหลังบ้าน</p>
        </div>
      </div>

      <div className="h-px bg-white/10 mx-6 mb-4" />

      {/* เมนูนำทาง */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-white/30 mb-2">
          เมนูหลัก
        </p>
        {NAV_ITEMS.map(({ key, label, icon: Icon, path,children }) => {
          const isActive = path && location.pathname === path
          const isOpen = openKey === key

          const isChildActive = children?.some((c) => location.pathname === c.path)
        if (children) {
            return (
              <div key={key}>
                {/* Parent button */}
                <button
                  onClick={() => toggleDropdown(key)}
                  className={`relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isChildActive
                      ? "bg-white/[0.07] text-white"
                      : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isChildActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-accent-500" />
                  )}
                  <Icon size={17} strokeWidth={1.8} />
                  <span className="font-medium flex-1 text-left">{label}</span>
                  {/* ลูกศรหมุนเมื่อเปิด */}
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Submenu */}
                {isOpen && (
                  <div className="mt-1 ml-4 pl-3 border-l border-white/10 space-y-0.5">
                    {children.map((child) => {
                      const isChildItemActive = location.pathname === child.path
                      return (
                        <Link
                          key={child.key}
                          to={child.path}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                            isChildItemActive
                              ? "text-white bg-white/[0.07]"
                              : "text-white/45 hover:text-white hover:bg-white/[0.04]"
                          }`}
                        >
                          {/* จุดเล็กๆ แทน icon */}
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isChildItemActive ? "bg-accent-400" : "bg-white/20"
                            }`}
                          />
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }
        })}
      </nav>

      {/* โปรไฟล์ผู้ใช้ */}
      <div className="px-4 pb-5 pt-3">
        <div className="h-px bg-white/10 mb-4" />
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-accent-500/20 border border-white/10 flex items-center justify-center font-display text-xs font-medium text-accent-100">
            กว
          </div>
          <div className="flex-1 leading-tight">
            <p className="text-sm font-medium text-white">กวินทร์ อมรเดช</p>
            <p className="text-[11px] text-white/40">ผู้ดูแลระบบ</p>
          </div>
          <button
            aria-label="ออกจากระบบ"
            className="text-white/40 hover:text-white transition-colors"
          >
            <LogOut size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </aside>
  );
}
