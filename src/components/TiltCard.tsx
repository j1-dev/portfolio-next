// src/components/TiltCard.tsx
import { useRef, useEffect, JSX } from 'react';
import VanillaTilt from 'vanilla-tilt';
import type { TiltOptions } from 'vanilla-tilt';

interface TiltCardProps {
  children: JSX.Element;
  options?: Partial<TiltOptions>;
}

export function TiltCard({ children, options }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Initialize tilt on this element
      VanillaTilt.init(ref.current, {
        reverse: true,
        max: 15, // max tilt rotation (degrees)
        speed: 400, // how fast the tilt responds
        glare: false, // enables glare effect
        ...options,
      });

      // Cleanup on unmount
      return () => {
        (ref.current as (HTMLDivElement & { vanillaTilt?: { destroy: () => void } }))?.vanillaTilt?.destroy();
      };
    }
  }, [options]);

  return (
    <div
      ref={ref}
      className="will-change-transform transform-style-preserve-3d perspective-1000">
      {children}
    </div>
  );
}
