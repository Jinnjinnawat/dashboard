import { Routes, Route } from "react-router-dom"
import DashboardPage from "./page/DashboardPage"
import Sidebar from "./components/Sidebar"
import Topbar
 from "./components/Topbar"
export default function App() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar />
        <main className="px-6 lg:px-8 py-7">
          <Routes>
            <Route path="/"          element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}