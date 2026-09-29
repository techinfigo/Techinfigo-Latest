'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';

interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({ 
  value, 
  duration = 2, 
  decimals = 0, 
  prefix = '', 
  suffix = '',
  className = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Starts at the real value, so the server HTML, search engines, slow phones
  // and anyone who never scrolls here see the number instead of "0.0x".
  const [currentValue, setCurrentValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      // Respect the OS "reduce motion" setting: just show the value.
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

      let startTime: number;
      let frameId: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCurrentValue(easeProgress * value);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };

      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {currentValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};
