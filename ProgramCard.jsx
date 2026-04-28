export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) {
  const styles = {
    primary: 'bg-white text-black hover:bg-white/90',
    secondary: 'border border-white/15 bg-white/5 text-white hover:bg-white/10',
    ghost: 'text-white/60 hover:bg-white/10 hover:text-white',
    danger: 'border border-red-400/30 bg-red-500/10 text-red-100 hover:bg-red-500/15',
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
