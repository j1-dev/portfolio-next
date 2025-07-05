import React, { useRef, useEffect, useState } from 'react';

interface MarqueeSkillsProps {
  items: React.ReactNode[];
  speed?: number; // px per second
  className?: string;
  style?: React.CSSProperties;
}

const MarqueeSkills: React.FC<MarqueeSkillsProps> = ({
  items,
  speed = 60,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [contentWidth, setContentWidth] = useState(0);
  const [numCopies, setNumCopies] = useState(2);

  // Measure content width after render
  useEffect(() => {
    if (contentRefs.current[0]) {
      setContentWidth(contentRefs.current[0].offsetWidth);
    }
  }, [items.length]);

  // Dynamically determine how many copies are needed to fill the viewport
  useEffect(() => {
    if (!contentWidth || !containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    setNumCopies(Math.max(2, Math.ceil(containerW / contentWidth) + 2));
  }, [contentWidth]);

  useEffect(() => {
    if (!contentWidth) return;
    let animationFrame: number;
    let start: number | null = null;

    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const x = ((elapsed * speed) / 1000) % contentWidth;
      for (let i = 0; i < numCopies; i++) {
        const ref = contentRefs.current[i];
        if (ref) {
          ref.style.transform = `translate3d(${-x + i * contentWidth}px,0,0)`;
        }
      }
      animationFrame = window.requestAnimationFrame(animate);
    }
    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [speed, contentWidth, items.length, numCopies]);

  const gapPx = 4; // Tailwind gap-4 = 1rem = 16px

  return (
    <div
      ref={containerRef}
      className={`relative w-screen overflow-hidden h-fit ${className}`}
      style={style}>
      {Array.from({ length: numCopies }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            contentRefs.current[i] = el;
          }}
          className="flex gap-4 items-center absolute left-0 top-0"
          style={{ willChange: 'transform' }}>
          {items.map((item, j) => (
            <React.Fragment key={j}>{item}</React.Fragment>
          ))}
          <div style={{ width: gapPx }} aria-hidden="true" />
        </div>
      ))}
    </div>
  );
};

export default MarqueeSkills;
