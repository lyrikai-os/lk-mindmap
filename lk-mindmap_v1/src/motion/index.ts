/**
 * Shared shell motion — GSAP only (no Excalidraw canvas hooks).
 * Durations stay ≤~200ms; prefers-reduced-motion snaps to final.
 */
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, Flip, SplitText);

/** Default shell motion — keep snappy (≤~200ms). */
export const MOTION = {
  duration: 0.18,
  durationFast: 0.12,
  ease: 'power2.out',
  easeIn: 'power2.in',
  stagger: 0.018,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Merge caller vars with defaults; reduced-motion → instant set (duration 0). */
export function motionVars(vars: gsap.TweenVars = {}): gsap.TweenVars {
  if (prefersReducedMotion()) {
    const { stagger: _s, delay: _d, ...rest } = vars;
    return { ...rest, duration: 0, delay: 0, stagger: 0, ease: 'none' };
  }
  return {
    duration: MOTION.duration,
    ease: MOTION.ease,
    ...vars,
  };
}

/** Flip.from defaults for shell layout continuity. */
export function flipVars(vars: Flip.FromToVars = {}): Flip.FromToVars {
  const { duration: _callerDuration, ease: _callerEase, ...rest } = vars;
  if (prefersReducedMotion()) {
    return {
      absolute: false,
      nested: true,
      ...rest,
      duration: 0,
      ease: 'none',
    };
  }
  return {
    absolute: false,
    nested: true,
    duration: MOTION.duration,
    ease: MOTION.ease,
    ...vars,
  };
}

export { gsap, useGSAP, Flip, SplitText };
