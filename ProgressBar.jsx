export default function Card({ children, className = '', selected = false, ...props }) {
  return (
    <div
      className={`rounded-3xl border p-4 shadow-2xl shadow-black/20 transition ${
        selected ? 'border-white bg-white text-black' : 'border-white/10 bg-white/[0.045] text-white'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
