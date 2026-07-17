import { useEffect, useState } from "react"
import axios from "axios"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"
import { Laptop, MapPin, FileText, Users, ClipboardList } from "lucide-react"

const COLORS = ["#2655FF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

export default function DashboardPage() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/summary")
      .then((res) => setSummary(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center py-20 text-ink-400 text-sm">
      กำลังโหลด...
    </div>
  )

  const CARDS = [
    { label: "Notebook ทั้งหมด",   value: summary.totalNotebook,   icon: Laptop },
    { label: "การยืมทั้งหมด",      value: summary.totalBorrow,     icon: ClipboardList },
    { label: "Location ทั้งหมด",   value: summary.totalLocation,   icon: MapPin },
    { label: "Department ทั้งหมด", value: summary.totalDepartment, icon: Users },
    { label: "Contract ทั้งหมด",   value: summary.totalContract,   icon: FileText },
  ]

  return (
    <div className="space-y-6">

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {CARDS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-surface-card border border-surface-border rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-ink-500">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                <Icon size={15} strokeWidth={1.8} className="text-accent-600" />
              </div>
            </div>
            <p className="font-display text-3xl font-semibold text-ink-900">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* กราฟแท่ง — Brand */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-5 shadow-card">
          <h2 className="font-display font-semibold text-ink-900 mb-4">
            Notebook แต่ละ Brand
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={summary.brandStats}>
              <XAxis dataKey="brand" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#2655FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* กราฟวงกลม — สถานะการยืม */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-5 shadow-card">
          <h2 className="font-display font-semibold text-ink-900 mb-4">
            สถานะการยืม
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={summary.statusStats}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ status, percent }) =>
                  `${status} ${(percent * 100).toFixed(0)}%`
                }
              >
                {summary.statusStats.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* กราฟแท่ง — Notebook แต่ละ Location */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-5 shadow-card lg:col-span-2">
          <h2 className="font-display font-semibold text-ink-900 mb-4">
            Notebook แต่ละ Location
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={summary.locationStats}>
              <XAxis dataKey="location" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}