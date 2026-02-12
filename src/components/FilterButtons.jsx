const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function FilterButtons({ filter, setFilter }) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
        Filter tasks by status
      </p>

      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((option) => {
          const isActive = filter === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded border px-3 py-2 text-sm ${
                isActive
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
