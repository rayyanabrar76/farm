interface Props {
  variant?: "full" | "icon";
  onDark?: boolean;
  className?: string;
  height?: number;
}

export default function Logo({ variant = "full", onDark = false, className, height = 40 }: Props) {
  const textPrimary = onDark ? "#ffffff" : "#1B5E28";
  const taglineColor = onDark ? "rgba(255,255,255,0.45)" : "#4CAF72";

  const IconMark = (
    <g>
      {/* Outer glow ring */}
      <circle cx="48" cy="48" r="44" fill="none" stroke="#4CAF72" strokeWidth="0.8" opacity="0.20" />
      {/* Badge */}
      <circle cx="48" cy="48" r="40" fill="url(#agrl-bg)" />
      {/* Inner ring */}
      <circle cx="48" cy="48" r="33" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />

      {/* Leaf outline */}
      <path
        d="M48 80 C22 72 17 26 48 12 C79 26 74 72 48 80Z"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.5"
      />
      {/* Leaf central vein */}
      <line
        x1="48" y1="78" x2="48" y2="15"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
        strokeDasharray="2 4"
        strokeLinecap="round"
      />

      {/* Y-network from hub */}
      <line x1="48" y1="50" x2="48" y2="23"  stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.92" />
      <line x1="48" y1="50" x2="31" y2="65"  stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.92" />
      <line x1="48" y1="50" x2="65" y2="65"  stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.92" />

      {/* Gold nodes at tips */}
      <circle cx="48" cy="22"  r="5.5" fill="url(#agrl-gd)" />
      <circle cx="30" cy="66"  r="5.5" fill="url(#agrl-gd)" />
      <circle cx="66" cy="66"  r="5.5" fill="url(#agrl-gd)" />

      {/* Hub ring + dot */}
      <circle cx="48" cy="50" r="9"   fill="white" />
      <circle cx="48" cy="50" r="4.5" fill="url(#agrl-bg)" />

      {/* Leaf-tip dot */}
      <circle cx="48" cy="77" r="3" fill="rgba(255,255,255,0.38)" />
    </g>
  );

  if (variant === "icon") {
    const h = height;
    const w = height;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 96 96"
        width={w}
        height={h}
        fill="none"
        aria-label="Agrolync icon"
        className={className}
      >
        <defs>
          <linearGradient id="agrl-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3DA05E" />
            <stop offset="100%" stopColor="#135120" />
          </linearGradient>
          <linearGradient id="agrl-gd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD17A" />
            <stop offset="100%" stopColor="#CC8300" />
          </linearGradient>
        </defs>
        {IconMark}
      </svg>
    );
  }

  /* full lockup — aspect ratio 420:96 */
  const w = Math.round((height / 96) * 420);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 96"
      width={w}
      height={height}
      fill="none"
      aria-label="Agrolync logo"
      className={className}
    >
      <defs>
        <linearGradient id="agrl-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3DA05E" />
          <stop offset="100%" stopColor="#135120" />
        </linearGradient>
        <linearGradient id="agrl-gd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD17A" />
          <stop offset="100%" stopColor="#CC8300" />
        </linearGradient>
      </defs>

      {IconMark}

      {/* Wordmark */}
      <text
        x="106"
        y="59"
        fontFamily="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontSize="44"
        fontWeight="800"
        letterSpacing="-2"
        fill={textPrimary}
      >
        Agro<tspan fill="#F5A623">lync</tspan>
      </text>

      {/* Tagline */}
      <text
        x="108"
        y="77"
        fontFamily="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontSize="10"
        fontWeight="700"
        letterSpacing="4"
        fill={taglineColor}
      >
        FARM TO MARKET · AFRICA
      </text>
    </svg>
  );
}
