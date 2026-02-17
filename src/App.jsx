import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import AllTasks from "./pages/AllTasks";
import NotFound from "./pages/NotFound";
import { getCurrentSession } from "./api/client";
import checkAdmin from "./utils/checkAdmin";
import ExportPage from "./pages/ExportPage";

function App() {
  const session = getCurrentSession();
  const isAdmin = checkAdmin(session.role);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6 text-[var(--color-text)]">
      <main className="mx-auto max-w-3xl">
        <Navbar isAdmin={isAdmin} />

        {/* Small session summary helps interviewers see current tenant/user quickly. */}
        <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
          Tenant: {session.tenantId} | User: {session.userId} | Role:{" "}
          {session.role}
        </p>

        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route
            path="/export"
            element={isAdmin ? <ExportPage /> : <Navigate to="/tasks" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
