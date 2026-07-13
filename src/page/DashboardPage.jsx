import { useState } from "react";
import { ShoppingBag, Wallet, Clock, Users } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import StatCard from "../components/StatCard.jsx";
import DataTableDashboard from "../components/DataTableDashboard.jsx";
import { orders, summary } from "../data/orders.js";

const COLUMNS = [
  { key: "NotebookID", label: "Notebook ID" },
  { key: "Brand", label: "Brand" },
  { key: "Model", label: "Model" },
  { key: "location.LocationName", label: "Location" },
  { key: "contract.ContractNo", label: "Contract No" },
  { key: "contract.Vendor", label: "Vendor" },
]
export default function App() {
  const [activeKey, setActiveKey] = useState("orders");

  return (
    <div className="flex min-h-screen bg-surface">


      <div className="flex-1 min-w-0">


        <main className="px-5 lg:px-8 py-7 max-w-[1400px]">
          {/* หัวข้อหน้า */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-semibold text-ink-900">
                คำสั่งซื้อ
              </h1>
              <p className="text-sm text-ink-500 mt-1">
                ภาพรวมและรายการคำสั่งซื้อทั้งหมดในระบบ
              </p>
            </div>
          </div>

          {/* การ์ดสรุปข้อมูล */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              label="ยอดขายรวม"
              value={`฿${summary.totalRevenue.toLocaleString("th-TH")}`}
              delta="12.4%"
              trend="up"
              icon={Wallet}
            />
            <StatCard
              label="คำสั่งซื้อทั้งหมด"
              value={summary.totalOrders}
              delta="4.1%"
              trend="up"
              icon={ShoppingBag}
            />
            <StatCard
              label="รอดำเนินการ"
              value={summary.pendingOrders}
              delta="2.0%"
              trend="down"
              icon={Clock}
            />
            <StatCard
              label="ลูกค้าทั้งหมด"
              value={summary.uniqueCustomers}
              delta="6.8%"
              trend="up"
              icon={Users}
            />
          </div>

          {/* ตารางข้อมูล */}
          <DataTableDashboard
            columns={COLUMNS}
            apiUrl="http://localhost:5000/api/notebook/full"
            title="รายการ Notebook"
          />
        </main>
      </div>
    </div>
  );
}
