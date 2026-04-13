export function FlightMap() {
  const dhaka = { x: 680, y: 245 };
  const destinations = [
    { name: "London", x: 470, y: 150, flag: "🇬🇧" },
    { name: "Tokyo", x: 830, y: 195, flag: "🇯🇵" },
    { name: "Seoul", x: 800, y: 195, flag: "🇰🇷" },
    { name: "Bangkok", x: 720, y: 265, flag: "🇹🇭" },
    { name: "KL", x: 720, y: 295, flag: "🇲🇾" },
    { name: "Maldives", x: 640, y: 305, flag: "🇲🇻" },
    { name: "Dubai", x: 580, y: 225, flag: "🇦🇪" },
    { name: "Istanbul", x: 530, y: 175, flag: "🇹🇷" },
    { name: "Singapore", x: 725, y: 305, flag: "🇸🇬" },
    { name: "Toronto", x: 250, y: 155, flag: "🇨🇦" },
    { name: "New York", x: 270, y: 175, flag: "🇺🇸" },
    { name: "Berlin", x: 490, y: 140, flag: "🇩🇪" },
    { name: "Madrid", x: 440, y: 175, flag: "🇪🇸" },
    { name: "Beijing", x: 770, y: 185, flag: "🇨🇳" },
    { name: "Bali", x: 760, y: 320, flag: "🇮🇩" },
  ];

  const makeCurve = (to: { x: number; y: number }) => {
    const mx = (dhaka.x + to.x) / 2;
    const my = Math.min(dhaka.y, to.y) - 30 - Math.abs(dhaka.x - to.x) * 0.08;
    return `M ${dhaka.x} ${dhaka.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  };

  return (
    <section className="py-20 bg-eco-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-foreground">
            From Dhaka to the <span className="text-gradient-eco">World</span>
          </h2>
          <p className="mt-3 text-primary-foreground/60">Animated flight routes from Bangladesh to 15+ international destinations</p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-eco mx-auto" />
        </div>

        <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto">
          <svg viewBox="0 0 1000 450" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.55 0.2 145)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="oklch(0.55 0.2 145)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Simple world map outline */}
            <rect width="1000" height="450" fill="none" />
            <ellipse cx="500" cy="225" rx="480" ry="210" fill="none" stroke="oklch(1 0 0 / 0.05)" strokeWidth="1" />
            <line x1="20" y1="225" x2="980" y2="225" stroke="oklch(1 0 0 / 0.03)" strokeWidth="0.5" />
            <line x1="500" y1="15" x2="500" y2="435" stroke="oklch(1 0 0 / 0.03)" strokeWidth="0.5" />

            {/* Flight paths */}
            {destinations.map((dest, i) => (
              <path
                key={dest.name}
                d={makeCurve(dest)}
                fill="none"
                stroke="oklch(0.55 0.2 145 / 0.4)"
                strokeWidth="1.5"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                style={{
                  animation: `draw-path 2s ease-out ${i * 0.2}s forwards`,
                }}
              />
            ))}

            {/* Animated planes */}
            {destinations.map((dest, i) => (
              <circle
                key={`plane-${dest.name}`}
                r="3"
                fill="oklch(0.78 0.15 85)"
                style={{
                  offsetPath: `path("${makeCurve(dest)}")`,
                  animation: `fly-plane 3s ease-in-out ${i * 0.3 + 1}s infinite`,
                }}
              />
            ))}

            {/* Dhaka hub */}
            <circle cx={dhaka.x} cy={dhaka.y} r="20" fill="url(#glow)" />
            <circle cx={dhaka.x} cy={dhaka.y} r="5" fill="oklch(0.55 0.2 145)" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            <text x={dhaka.x} y={dhaka.y - 12} textAnchor="middle" fill="oklch(0.55 0.2 145)" fontSize="10" fontWeight="bold">DHAKA</text>

            {/* Destination dots */}
            {destinations.map((dest, i) => (
              <g key={`dot-${dest.name}`} style={{ animation: `float-up 0.5s ease-out ${i * 0.15 + 0.5}s both` }}>
                <circle cx={dest.x} cy={dest.y} r="3" fill="oklch(0.78 0.15 85)" />
                <text x={dest.x} y={dest.y - 8} textAnchor="middle" fill="oklch(1 0 0 / 0.7)" fontSize="8">
                  {dest.flag} {dest.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
