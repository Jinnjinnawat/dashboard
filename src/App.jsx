import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardPage from "./page/DashboardPage";
import ContractPage from "./page/ContractPage";
import LocationPage from "./page/LocationPage";
import NotebookPage from "./page/์NotebookPage";
import Departments from "./page/Departments";
import BorrowPage from "./page/BorrowPage";
export default function App() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar />
        <main className="px-6 lg:px-8 py-7">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/notebook" element={<NotebookPage />} />
            <Route path="/contract" element={<ContractPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/department" element={<Departments />} />
            <Route path="/borrow" element={<Departments />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
