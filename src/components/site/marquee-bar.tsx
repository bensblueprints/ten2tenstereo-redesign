const items = [
  "Car Stereo",
  "Subs & Amps",
  "Apple CarPlay",
  "Window Tint",
  "Vehicle Wraps",
  "Alarms & Security",
  "LED Headlights",
  "Tires & Wheels",
  "Remote Start",
  "Backup Cameras",
];

export function MarqueeBar() {
  const loop = [...items, ...items];
  return (
    <div className="border-y border-[var(--muted-line)] bg-secondary/40 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-5">
        {loop.map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-8 px-8 font-mono-panel text-[12px] uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span className="text-amber">✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
