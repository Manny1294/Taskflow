import { NavLink } from "react-router-dom";

export default function Navbar({ isAdmin }) {
  // Shared base styling for every nav button.
  const linkBase =
    "rounded px-3 py-2 text-sm font-medium border border-[var(--color-border)]";
  // Applied when the current route matches the link.
  const active =
    "bg-[var(--color-primary)] text-white border-[var(--color-primary)]";
  // Applied when the link is not the current route.
  const inactive = "bg-[var(--color-surface)] text-[var(--color-text)]";

  return (
    // Top navigation bar with brand title and route links.
    <nav className="mb-6 flex flex-wrap items-center gap-2">
      <h1 className="mr-3 text-2xl font-bold">TaskFlow</h1>

      {/* Task page link (core requirement). */}
      <NavLink to="/tasks" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
        Tasks
      </NavLink>

      {/* Export page link is visible to admin users only. */}
      {isAdmin && (
        <NavLink to="/export" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
          Export
        </NavLink>
      )}
    </nav>
  );
}
