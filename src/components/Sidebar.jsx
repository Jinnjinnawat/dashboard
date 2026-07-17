import {
  BarChart3,
  ChevronDown,
  Database,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Users,
  Menu,
  X,
  Book
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { key: "dashboard", label: "แดชบอร์ด", icon: LayoutDashboard, path: "/" },
  {
    key: "database",
    label: "ฐานข้อมูล",
    icon: Database,
    children: [
      { key: "notebook", label: "ข้อมูล Notebook", path: "/notebook" },
      { key: "contract", label: "ข้อมูล Contract", path: "/contract" },
      { key: "location", label: "ข้อมูล Location", path: "/location" },
      { key: "departments", label: "ข้อมูล Departments", path: "/department" },
    ],
  },
  { key: "customers", label: "ข้อมูลการยืม",icon:Book ,path:"/borrow"}
  
  
];

export default function Sidebar() {
  const location = useLocation();
  const [openKey, setOpenKey] = useState("database");
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleDropdown = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg bg-navy-950 text-white shadow-soft"
      >
        <Menu size={18} strokeWidth={2} />
      </button>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
      fixed md:sticky top-0 left-0 z-50 h-screen
      flex flex-col bg-navy-950 text-white shrink-0
      w-72 transition-transform duration-300
      ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
    `}>
        <div className="flex items-center gap-3 px-6 py-7">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
            <span className="font-display font-semibold text-sm text-white">SV</span>
          </div>
          <div className="leading-tight">
            <p className="font-display font-semibold text-sm tracking-wide">SVOA</p>
            <p className="text-[11px] text-white/40">ระบบจัดการการยืม</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-white/50 hover:text-white transition-colors"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="h-px bg-white/10 mx-6 mb-4" />

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-white/30 mb-2">
            เมนูหลัก
          </p>

          {NAV_ITEMS.map(({ key, label, icon: Icon, path, children }) => {
            const isActive = path && location.pathname === path;
            const isOpen = openKey === key;
            const isChildActive = children?.some(
              (child) => location.pathname === child.path
            );

            if (children) {
              return (
                <div key={key}>
                  <button
                    onClick={() => toggleDropdown(key)}
                    className={`relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${isChildActive
                      ? "bg-white/[0.07] text-white"
                      : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                      }`}
                  >
                    {isChildActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-accent-500" />
                    )}
                    <Icon size={17} strokeWidth={1.8} />
                    <span className="font-medium flex-1 text-left">{label}</span>
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-1 ml-4 pl-3 border-l border-white/10 space-y-0.5">
                      {children.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildItemActive = location.pathname === child.path;

                        return (
                          <Link
                            key={child.key}
                            to={child.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${isChildItemActive
                              ? "text-white bg-white/[0.07]"
                              : "text-white/45 hover:text-white hover:bg-white/[0.04]"
                              }`}
                          >
                            {ChildIcon ? (
                              <ChildIcon size={14} strokeWidth={1.8} />
                            ) : (
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${isChildItemActive ? "bg-accent-400" : "bg-white/20"
                                  }`}
                              />
                            )}
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={key}
                to={path || "#"}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive
                  ? "bg-white/[0.07] text-white"
                  : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                  }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-accent-500" />
                )}
                <Icon size={17} strokeWidth={1.8} />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
        {/*
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
        */}
      </aside>

    </>
  );
}
