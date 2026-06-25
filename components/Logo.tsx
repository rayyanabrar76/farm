interface Props {
  variant?: "full" | "icon";
  onDark?: boolean;
  className?: string;
  height?: number;
}

export default function Logo({ variant = "full", onDark = false, className, height = 44 }: Props) {
  const wordColor  = onDark ? "#ffffff"            : "#111827";
  const accentWord = onDark ? "#4CAF72"            : "#2D7A3A";
  const tagColor   = onDark ? "rgba(255,255,255,0.42)" : "#6B7280";

  /* ── Icon mark — rounded-square badge with sprouting leaf ── */
  const Badge = (
    <g>
      <defs>
        <linearGradient id="lg-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#3CB96B" />
          <stop offset="100%" stopColor="#145E30" />
        </linearGradient>
        <linearGradient id="lg-leaf" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.7)" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Badge background — rounded square */}
      <rect x="2" y="2" width="92" height="92" rx="22" fill="url(#lg-bg)" />

      {/* Subtle inner glow ring */}
      <rect x="2" y="2" width="92" height="92" rx="22"
        fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

      {/* ── Sprouting leaf mark ── */}
      {/* Stem */}
      <line x1="48" y1="76" x2="48" y2="42"
        stroke="white" strokeWidth="3.5" strokeLinecap="round" />

      {/* Left leaf blade */}
      <path d="M48 56 C38 50 26 50 22 38 C34 34 46 42 48 56 Z"
        fill="url(#lg-leaf)" />

      {/* Right leaf blade */}
      <path d="M48 46 C58 36 72 32 76 22 C64 20 52 30 48 46 Z"
        fill="url(#lg-leaf)" />

      {/* Soil/ground dots */}
      <circle cx="38" cy="79" r="3"   fill="rgba(255,255,255,0.35)" />
      <circle cx="48" cy="81" r="3.5" fill="rgba(255,255,255,0.5)"  />
      <circle cx="58" cy="79" r="3"   fill="rgba(255,255,255,0.35)" />
    </g>
  );

  /* ── Icon-only variant ── */
  if (variant === "icon") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 96 96"
        width={height} height={height}
        fill="none" aria-label="Agrolync" className={className}>
        {Badge}
      </svg>
    );
  }

  /* ── Full lockup ── */
  const w = Math.round((height / 96) * 380);
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 380 96"
      width={w} height={height}
      fill="none" aria-label="Agrolync logo" className={className}>
      {Badge}

      {/* Wordmark */}
      <text
        x="112" y="56"
        fontFamily="system-ui,-apple-system,'Segoe UI',sans-serif"
        fontSize="46"
        fontWeight="800"
        letterSpacing="-1.5"
        fill={wordColor}
      >
        agro<tspan fill={accentWord}>lync</tspan>
      </text>

      {/* Tagline */}
      <text
        x="113" y="76"
        fontFamily="system-ui,-apple-system,'Segoe UI',sans-serif"
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="3.5"
        fill={tagColor}
      >
        FARM TO MARKET · AFRICA
      </text>
    </svg>
  );
}
