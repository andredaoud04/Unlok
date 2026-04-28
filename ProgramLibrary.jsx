export default function ProgressBar({ value = 0, label, detail }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      {(label || detail) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-white/80">{label}</span>
          <span className="text-white/40">{detail || `${Math.round(safeValue)}%`}</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
