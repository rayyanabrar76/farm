interface Props {
  variant?: "full" | "icon";
  onDark?: boolean;
  className?: string;
  height?: number;
}

export default function Logo({ variant = "full", onDark = false, className, height = 44 }: Props) {
  const wordColor  = onDark ? "#ffffff" : "#111827";
  const subColor   = onDark ? "rgba(255,255,255,0.5)" : "#6B7280";

  /* ── Icon mark — bracket-square style (like Arena Club) ── */
  const Icon = (
    <g>
      {/* Outer filled square — dark green */}
      <rect x="0" y="0" width="96" height="96" rx="14" fill="#1B5E28" />

      {/* Inner green-lighter square (layered) */}
      <rect x="6" y="6" width="84" height="84" rx="10" fill="#2D7A3A" />

      {/* Bracket lines — white, like Arena Club */}
      {/* Top-left bracket */}
      <polyline points="20,36 20,20 36,20" fill="none" stroke="white" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
      {/* Top-right bracket */}
      <polyline points="60,20 76,20 76,36" fill="none" stroke="white" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
      {/* Bottom-left bracket */}
      <polyline points="20,60 20,76 36,76" fill="none" stroke="white" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
      {/* Bottom-right bracket */}
      <polyline points="60,76 76,76 76,60" fill="none" stroke="white" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />

      {/* Center leaf mark */}
      {/* Stem */}
      <line x1="48" y1="66" x2="48" y2="46" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Left leaf */}
      <path d="M48 56 C42 52 33 52 30 44 C38 41 46 48 48 56 Z" fill="white" opacity="0.9" />
      {/* Right leaf */}
      <path d="M48 50 C54 43 63 40 66 34 C58 32 50 40 48 50 Z" fill="white" opacity="0.9" />

      {/* Green accent dot — bottom-right corner like Arena Club */}
      <rect x="68" y="68" width="10" height="10" rx="2" fill="#4CAF72" />
    </g>
  );

  /* ── Icon-only ── */
  if (variant === "icon") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 96 96"
        width={height} height={height}
        fill="none" aria-label="Agrolync" className={className}>
        {Icon}
      </svg>
    );
  }

  /* ── Full lockup: icon + stacked wordmark ── */
  const iconH = height;
  const gap   = Math.round(height * 0.28);
  const fs1   = Math.round(height * 0.48);
  const fs2   = Math.round(height * 0.24);
  const totalW = iconH + gap + Math.round(height * 3.8);

  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${totalW} ${iconH}`}
      width={totalW} height={iconH}
      fill="none" aria-label="Agrolync logo" className={className}>

      {/* Icon */}
      <g transform={`scale(${iconH / 96})`}>
        {Icon}
      </g>

      {/* Wordmark — "AGROLYNC" stacked like Arena Club */}
      <text
        x={iconH + gap}
        y={iconH * 0.52}
        fontFamily="system-ui,-apple-system,'Segoe UI',Helvetica,sans-serif"
        fontSize={fs1}
        fontWeight="900"
        letterSpacing="-0.5"
        fill={wordColor}
      >AGROLYNC</text>

      <text
        x={iconH + gap + 2}
        y={iconH * 0.82}
        fontFamily="system-ui,-apple-system,'Segoe UI',Helvetica,sans-serif"
        fontSize={fs2}
        fontWeight="600"
        letterSpacing="3"
        fill={subColor}
      >FARM TO MARKET</text>
    </svg>
  );
}
