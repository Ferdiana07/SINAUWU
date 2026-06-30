// Logo SVG - Robot with Book (Kartun-style)
export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Book Pages - Left */}
      <path
        d="M50 75 Q35 72 25 68 Q20 66 18 60 Q20 55 25 54 Q35 52 50 55"
        fill="url(#bookLeft)"
      />
      {/* Book Pages - Right */}
      <path
        d="M50 75 Q65 72 75 68 Q80 66 82 60 Q80 55 75 54 Q65 52 50 55"
        fill="url(#bookRight)"
      />
      {/* Book Spine */}
      <path
        d="M50 55 Q50 70 50 75"
        stroke="white"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />

      {/* Robot Body - Lower */}
      <rect x="30" y="50" width="40" height="8" rx="3" fill="#E0E7FF" />

      {/* Robot Head - Main */}
      <rect x="28" y="22" width="44" height="30" rx="6" fill="white" />

      {/* Head Shadow/Depth */}
      <rect x="28" y="22" width="44" height="30" rx="6" fill="url(#headShine)" fillOpacity="0.2" />

      {/* Side Accents */}
      <rect x="24" y="26" width="6" height="18" rx="2" fill="#93C5FD" />
      <rect x="70" y="26" width="6" height="18" rx="2" fill="#93C5FD" />

      {/* Antenna Stem */}
      <rect x="48" y="10" width="4" height="14" rx="2" fill="#3B82F6" />

      {/* Antenna Ball */}
      <circle cx="50" cy="8" r="5" fill="#60A5FA" />
      <circle cx="48" cy="6" r="2" fill="white" fillOpacity="0.6" />

      {/* Eyes - Large and Friendly */}
      <ellipse cx="40" cy="35" rx="7" ry="8" fill="#93C5FD" />
      <ellipse cx="60" cy="35" rx="7" ry="8" fill="#93C5FD" />

      {/* Eye Highlights */}
      <circle cx="42" cy="33" r="3" fill="white" />
      <circle cx="62" cy="33" r="3" fill="white" />
      <circle cx="38" cy="37" r="1.5" fill="white" fillOpacity="0.5" />
      <circle cx="58" cy="37" r="1.5" fill="white" fillOpacity="0.5" />

      {/* Smile - Big and Friendly */}
      <path
        d="M38 44 Q50 54 62 44"
        stroke="#93C5FD"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Stars - Sparkle Effects */}
      {/* Left Star (Purple) */}
      <path
        d="M15 20 L17 26 L23 26 L18.5 30 L20.5 36 L15 32 L9.5 36 L11.5 30 L7 26 L13 26 Z"
        fill="#A855F7"
        className="animate-pulse"
      />
      <circle cx="15" cy="28" r="1.5" fill="white" fillOpacity="0.8" />

      {/* Right Star (Blue) */}
      <path
        d="M82 18 L84 23 L89 23 L85 26.5 L87 31 L82 28 L77 31 L79 26.5 L75 23 L80 23 Z"
        fill="#3B82F6"
        className="animate-pulse"
      />
      <circle cx="82" cy="25" r="1.2" fill="white" fillOpacity="0.8" />

      {/* Gradients */}
      <defs>
        {/* Book Left Page - Purple to Blue */}
        <linearGradient id="bookLeft" x1="18" y1="54" x2="50" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>

        {/* Book Right Page - Blue to Dark Blue */}
        <linearGradient id="bookRight" x1="82" y1="54" x2="50" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="50%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        {/* Head Shine */}
        <linearGradient id="headShine" x1="28" y1="22" x2="72" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
