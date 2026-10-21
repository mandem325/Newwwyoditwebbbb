import React from "react";

export function UnicefLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`} title="UNICEF">
      <svg
        viewBox="0 0 280 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Lowercase bold "unicef" wordmark */}
        <text
          x="0"
          y="48"
          fill="#00adef"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
          fontWeight="800"
          fontSize="52"
          letterSpacing="-0.03em"
        >
          unicef
        </text>

        {/* Circular Mother & Child with Globe & Olive Branches */}
        <g transform="translate(195, 2) scale(0.95)">
          {/* Globe & Latitude Lines */}
          <circle
            cx="34"
            cy="34"
            r="30"
            stroke="#00adef"
            strokeWidth="2.5"
            fill="none"
            opacity="0.4"
          />
          <ellipse
            cx="34"
            cy="34"
            rx="20"
            ry="30"
            stroke="#00adef"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <ellipse
            cx="34"
            cy="34"
            rx="10"
            ry="30"
            stroke="#00adef"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
          />
          <line x1="4" y1="34" x2="64" y2="34" stroke="#00adef" strokeWidth="2" opacity="0.3" />
          <line x1="8" y1="20" x2="60" y2="20" stroke="#00adef" strokeWidth="1.5" opacity="0.2" />
          <line x1="8" y1="48" x2="60" y2="48" stroke="#00adef" strokeWidth="1.5" opacity="0.2" />

          {/* Mother and Child Silhouette */}
          <path
            d="M 38,18 C 42,18 45,21 45,25 C 45,28 43,30 40,31 C 45,34 49,38 49,46 C 49,48 48,50 46,50 C 42,50 37,45 35,40 C 33,42 30,46 27,47 C 26,47 25,46 25,44 C 25,40 28,34 32,30 C 30,29 29,27 29,25 C 29,22 31,20 34,20 C 35,20 36,20 37,21 C 37,19 37,18 38,18 Z"
            fill="#00adef"
          />
          <circle cx="30" cy="23" r="3.5" fill="#00adef" />
          <circle cx="41" cy="20" r="4.5" fill="#00adef" />

          {/* Laurel Olive Wreath Branches */}
          <path
            d="M 6,42 C 2,30 8,14 20,6 C 18,10 16,16 18,22 C 20,18 22,12 28,9 C 26,15 25,20 28,26"
            stroke="#00adef"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 62,42 C 66,30 60,14 48,6 C 50,10 52,16 50,22 C 48,18 46,12 40,9 C 42,15 43,20 40,26"
            stroke="#00adef"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 12,50 C 20,60 48,60 56,50"
            stroke="#00adef"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

export function TvoaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 ${className}`}
      title="The Voice of Africa (TVOA)"
    >
      <svg
        viewBox="0 0 240 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Concentric Arcs forming the outline of Africa */}
        <g transform="translate(4, 4)">
          {/* Top-West Africa Arcs: Golden Yellow */}
          <path
            d="M 8,36 A 24,24 0 0,1 36,8"
            stroke="#fab712"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 14,34 A 16,16 0 0,1 34,14"
            stroke="#fab712"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 22,32 A 8,8 0 0,1 32,22"
            stroke="#fab712"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* North-East Africa Arcs: Emerald Jade Green */}
          <path
            d="M 38,6 A 26,26 0 0,1 68,26"
            stroke="#009e86"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 38,15 A 18,18 0 0,1 60,30"
            stroke="#009e86"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 38,24 A 10,10 0 0,1 52,34"
            stroke="#009e86"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Horn & Central-South Africa: Vibrant Crimson Target Arcs */}
          <circle cx="48" cy="52" r="18" stroke="#e6382a" strokeWidth="6" fill="none" />
          <circle cx="48" cy="52" r="10" stroke="#e6382a" strokeWidth="5" fill="none" />
          <circle cx="48" cy="52" r="3.5" fill="#e6382a" />
          <path
            d="M 52,66 C 50,72 42,75 42,75"
            stroke="#e6382a"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>

        {/* Wordmark */}
        <g transform="translate(86, 26)">
          <text
            x="0"
            y="18"
            fill="#111827"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="22"
            letterSpacing="-0.02em"
          >
            VOICE OF AFRICA
          </text>
          <text
            x="1"
            y="35"
            fill="#fab712"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="12"
            letterSpacing="0.24em"
          >
            COMMUNITY & YOUTH
          </text>
        </g>
      </svg>
    </div>
  );
}

export function FaweLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`} title="FAWE Ethiopia Chapter">
      <svg
        viewBox="0 0 250 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Outer Circular Seal Badge */}
        <g transform="translate(4, 2)">
          {/* Subtle Outer Ring */}
          <circle
            cx="38"
            cy="38"
            r="36"
            stroke="#2b1842"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            fill="#ffffff"
          />

          {/* Africa Continent Silhouette in Warm Amber */}
          <path
            d="M 28,18 C 34,14 46,16 52,22 C 54,26 56,32 52,36 C 48,40 46,46 44,52 C 42,56 36,60 36,60 C 34,56 32,50 30,46 C 26,42 22,36 24,28 C 24,22 26,20 28,18 Z"
            fill="#f5a623"
            opacity="0.85"
          />

          {/* Girl reading book silhouette */}
          <circle cx="39" cy="24" r="5" fill="#2b1842" />
          {/* Ponytail */}
          <path
            d="M 35,24 C 32,22 30,25 32,28"
            stroke="#2b1842"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Torso in school uniform */}
          <path d="M 33,31 C 36,29 42,29 45,31 L 47,44 L 31,44 Z" fill="#2b1842" />
          <path d="M 37,30 L 39,33 L 41,30" stroke="#ffffff" strokeWidth="1" />
          {/* Open Book */}
          <path
            d="M 33,40 L 39,43 L 45,40 L 47,45 L 39,48 L 31,45 Z"
            fill="#ffffff"
            stroke="#2b1842"
            strokeWidth="1.2"
          />
        </g>

        {/* Wordmark */}
        <g transform="translate(90, 24)">
          <text
            x="0"
            y="22"
            fill="#2b1842"
            fontFamily="Georgia, serif"
            fontWeight="900"
            fontSize="28"
            letterSpacing="0.04em"
          >
            FAWE
          </text>
          <text
            x="1"
            y="38"
            fill="#523977"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="10.5"
            letterSpacing="0.18em"
          >
            ETHIOPIA CHAPTER
          </text>
        </g>
      </svg>
    </div>
  );
}

export function IrcLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 ${className}`}
      title="International Rescue Committee"
    >
      <svg
        viewBox="0 0 260 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Yellow IRC Box with Bold Black Arrow */}
        <g transform="translate(2, 2)">
          {/* Bright Yellow Box */}
          <rect width="72" height="74" rx="6" fill="#ffc709" />

          {/* Iconic Diagonal Arrow Icon */}
          <g transform="translate(14, 10)">
            {/* Top-Right Arrow Point */}
            <path
              d="M 18,4 L 40,4 L 40,26 L 30,26 L 30,16 L 16,30 L 4,18 L 18,4 Z"
              fill="#000000"
            />
            {/* Lower Stem Block */}
            <path d="M 4,4 L 14,4 L 14,14 L 4,14 Z" fill="#000000" />
          </g>
        </g>

        {/* Wordmark */}
        <g transform="translate(86, 22)">
          <text
            x="0"
            y="14"
            fill="#000000"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="11"
            letterSpacing="0.12em"
          >
            INTERNATIONAL
          </text>
          <text
            x="0"
            y="30"
            fill="#000000"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="18"
            letterSpacing="0.04em"
          >
            RESCUE
          </text>
          <text
            x="0"
            y="45"
            fill="#000000"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            fontSize="10"
            letterSpacing="0.2em"
          >
            COMMITTEE
          </text>
        </g>
      </svg>
    </div>
  );
}
