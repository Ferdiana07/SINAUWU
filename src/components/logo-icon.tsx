// Logo SVG - Robot with Book
export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Book Base */}
      <path
        d="M10 55 Q15 50 25 52 Q35 54 40 52 L40 75 Q35 78 25 76 Q15 74 10 75 Z"
        fill="url(#logoBookLeftGradient)"
      />
      <path
        d="M60 52 Q65 50 75 52 Q85 54 90 55 L90 75 Q85 74 75 76 Q65 78 60 75 Z"
        fill="url(#logoBookRightGradient)"
      />

      {/* Robot Head */}
      <rect x="25" y="20" width="50" height="35" rx="6" fill="white" />
      <rect x="25" y="20" width="50" height="35" rx="6" fill="url(#logoHeadGradient)" fillOpacity="0.3" />

      {/* Antenna */}
      <rect x="48" y="8" width="4" height="14" rx="2" fill="#3B82F6" />
      <circle cx="50" cy="6" r="4" fill="#3B82F6" />

      {/* Eyes */}
      <circle cx="38" cy="33" r="6" fill="#93C5FD" />
      <circle cx="62" cy="33" r="6" fill="#93C5FD" />
      <circle cx="40" cy="31" r="2" fill="white" />
      <circle cx="64" cy="31" r="2" fill="white" />

      {/* Smile */}
      <path
        d="M40 43 Q50 52 60 43"
        stroke="#93C5FD"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Blue accents on head sides */}
      <rect x="21" y="25" width="6" height="20" rx="2" fill="#93C5FD" fillOpacity="0.5" />
      <rect x="73" y="25" width="6" height="20" rx="2" fill="#93C5FD" fillOpacity="0.5" />

      {/* Stars */}
      <path
        d="M15 18 L17 23 L22 23 L18 27 L20 32 L15 28 L10 32 L12 27 L8 23 L13 23 Z"
        fill="#A855F7"
      />
      <path
        d="M78 15 L79.5 19 L84 19 L80.5 22 L82 26 L78 23 L74 26 L75.5 22 L72 19 L76.5 19 Z"
        fill="#3B82F6"
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="logoBookLeftGradient" x1="10" y1="52" x2="40" y2="52">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
        <linearGradient id="logoBookRightGradient" x1="60" y1="52" x2="90" y2="52">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="logoHeadGradient" x1="25" y1="20" x2="75" y2="55">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
    </svg>
  );
}
