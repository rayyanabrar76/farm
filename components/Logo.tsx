interface Props {
  variant?: "full" | "icon";
  onDark?: boolean;
  className?: string;
  height?: number;
}

/* Complete-Farmer-style identity: a circular medallion icon + a rounded,
   lowercase, two-line wordmark ("agro / lync.") in Baloo 2. */

export default function Logo({ variant = "full", onDark = false, className, height = 44 }: Props) {
  const wordColor = onDark ? "#ffffff" : "#0E2A12";
  const dotColor  = onDark ? "#7BD389" : "#2D7A3A";
  const discFill  = onDark ? "#ffffff" : "#1A5514";
  const leafFill  = onDark ? "#1A5514" : "#ffffff";

  /* ── Circular medallion icon ── */
  const Icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      width={height} height={height}
      fill="none" aria-label="Agrolync"
      className={variant === "icon" ? className : undefined}
    >
      <circle cx="48" cy="48" r="46" fill={discFill} />
      {/* sprout / leaf */}
      <line x1="48" y1="70" x2="48" y2="44" stroke={leafFill} strokeWidth="4" strokeLinecap="round" />
      <path d="M48 58 C40 54 30 54 26 44 C36 40 46 48 48 58 Z" fill={leafFill} />
      <path d="M48 50 C56 41 66 38 70 30 C60 27 50 38 48 50 Z" fill={leafFill} />
    </svg>
  );

  if (variant === "icon") return Icon;

  /* ── Full lockup: medallion + rounded lowercase wordmark (single line) ── */
  const fs = Math.round(height * 0.5);

  return (
    <span
      className={["inline-flex items-center", className].filter(Boolean).join(" ")}
      style={{ gap: Math.round(height * 0.18) }}
    >
      {Icon}
      <span
        style={{
          fontFamily: "'Baloo 2', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: fs,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          color: wordColor,
        }}
      >
        agrolync<span style={{ color: dotColor }}>.</span>
      </span>
    </span>
  );
}
