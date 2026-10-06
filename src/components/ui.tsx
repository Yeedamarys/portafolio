import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionTemplate,
  useMotionValue,
  usePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { X } from 'lucide-react';
import { motionTokens, springs } from '../lib/motion';

/* ---------- Shared class strings ---------- */

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] motion-reduce:active:scale-100 disabled:opacity-60';

export const btnPrimary = `${buttonBase} bg-neon px-5 py-3 text-night shadow-[0_10px_30px_-12px_rgba(255,79,174,0.9)] hover:bg-neon-soft`;
export const btnSecondary = `${buttonBase} border border-chrome/35 bg-white/[0.04] px-5 py-3 text-ink hover:border-chrome/70 hover:bg-white/[0.08]`;
export const btnQuiet = `${buttonBase} px-3 py-3 text-ink-soft hover:text-ink`;
export const chip =
  'rounded-lg border border-neon/20 bg-neon/[0.08] px-2.5 py-1 text-xs font-semibold text-ink-soft';

/* ---------- Media hooks ---------- */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
export const useCoarsePointer = () => useMediaQuery('(pointer: coarse)');
export const useReduce = () => !!useReducedMotion();

/* ---------- Background: grid + glows with light parallax ---------- */

export const Background: React.FC = () => {
  const reduce = useReduce();
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 2000], [0, -120]);
  const glowY = useTransform(scrollY, [0, 2000], [0, 180]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={reduce ? undefined : { y: glowY }}
        className="absolute -left-48 -top-56 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(255,79,174,0.24),transparent_62%)]"
      />
      <motion.div
        style={reduce ? undefined : { y: glowY }}
        className="absolute -bottom-72 -right-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(217,212,224,0.09),transparent_62%)]"
      />
      <motion.div
        style={reduce ? undefined : { y: gridY }}
        className="bg-grid absolute inset-x-0 -top-10 h-[calc(100%+200px)] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black_35%,transparent_85%)]"
      />
    </div>
  );
};

/* ---------- Tile: glass panel with page-load entrance and pointer tilt ---------- */

export const tileVariants = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : motionTokens.distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduce ? motionTokens.duration.fast : motionTokens.duration.slow,
      ease: motionTokens.easing.smooth,
    },
  },
});

interface TileProps {
  id?: string;
  labelledBy?: string;
  ariaLabel?: string;
  as?: 'section' | 'div';
  tilt?: boolean;
  lit?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

export const Tile: React.FC<TileProps> = ({
  id,
  labelledBy,
  ariaLabel,
  as = 'section',
  tilt = true,
  lit = false,
  className = '',
  innerClassName = '',
  children,
}) => {
  const reduce = useReduce();
  const finePointer = useFinePointer();
  const tiltOn = tilt && finePointer && !reduce;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, springs.pointer);
  const springY = useSpring(rotateY, springs.pointer);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(0, springs.pointer);
  const glare = useMotionTemplate`radial-gradient(32rem circle at ${glareX}% ${glareY}%, rgba(255,143,203,0.11), transparent 60%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!tiltOn || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * motionTokens.tiltMaxDeg);
    rotateX.set(-(py - 0.5) * 2 * motionTokens.tiltMaxDeg);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  const shared = {
    id,
    'aria-labelledby': labelledBy,
    'aria-label': ariaLabel,
    variants: tileVariants(reduce),
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    style: tiltOn ? { rotateX: springX, rotateY: springY, transformPerspective: 1400 } : undefined,
    className: `glass ${lit ? 'glass-lit' : ''} relative scroll-mt-24 ${className}`,
  };

  const inner = (
    <>
      {tiltOn && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glare, opacity: glareOpacity }}
        />
      )}
      <div className={`relative ${innerClassName}`}>{children}</div>
    </>
  );

  return as === 'div' ? <motion.div {...shared}>{inner}</motion.div> : <motion.section {...shared}>{inner}</motion.section>;
};

/* ---------- Dialog: grows out of the element that opened it ---------- */

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  closeLabel: string;
  origin?: DOMRect | null;
  tone?: 'glass' | 'paper';
  printable?: boolean;
  size?: 'md' | 'lg';
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = (props) => (
  <AnimatePresence>{props.open && <DialogInner key="dialog" {...props} />}</AnimatePresence>
);

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const DialogInner: React.FC<DialogProps> = ({
  onClose,
  labelledBy,
  closeLabel,
  origin,
  tone = 'glass',
  printable = false,
  size = 'lg',
  children,
}) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [isPresent, safeToRemove] = usePresence();
  const reduce = useReduce();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Offset and scale that place the panel over the element it grew from (transform-origin: top left).
  const flipFrom = () => {
    const panel = panelRef.current;
    if (!panel || !origin || reduce) return null;
    const rect = panel.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    return {
      x: origin.left - rect.left,
      y: origin.top - rect.top,
      scaleX: origin.width / rect.width,
      scaleY: origin.height / rect.height,
    };
  };

  // Enter and exit choreography
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const from = flipFrom();
    const fade = { duration: reduce ? 0.15 : motionTokens.duration.fast };

    if (isPresent) {
      const enter = async () => {
        animate('[data-backdrop]', { opacity: [0, 1] }, fade);
        if (from) {
          await animate(
            panel,
            {
              x: [from.x, 0],
              y: [from.y, 0],
              scaleX: [from.scaleX, 1],
              scaleY: [from.scaleY, 1],
              opacity: [0.5, 1],
            },
            { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth },
          );
        } else {
          await animate(
            panel,
            { opacity: [0, 1], y: reduce ? 0 : [motionTokens.distance.md, 0] },
            reduce ? fade : { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth },
          );
        }
        animate('[data-dialog-content]', { opacity: [0, 1] }, fade);
      };
      enter();
    } else {
      const exit = async () => {
        animate('[data-dialog-content]', { opacity: 0 }, { duration: motionTokens.duration.instant });
        animate('[data-backdrop]', { opacity: 0 }, fade);
        await animate(
          panel,
          from
            ? { x: from.x, y: from.y, scaleX: from.scaleX, scaleY: from.scaleY, opacity: 0 }
            : { opacity: 0, y: reduce ? 0 : motionTokens.distance.sm },
          reduce ? fade : { duration: motionTokens.duration.normal, ease: motionTokens.easing.sharp },
        );
        safeToRemove?.();
      };
      exit();
    }
    // origin and reduce are read once per enter/exit on purpose
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent]);

  // Focus management, Escape to close, Tab trap, scroll lock
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const preferred = panel?.querySelector<HTMLElement>('[data-autofocus]');
    (preferred ?? closeRef.current)?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE) as ArrayLike<HTMLElement>).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  const panelTone =
    tone === 'paper'
      ? 'bg-white text-slate-800 border border-white/60'
      : 'bg-[#1d0a17]/95 text-ink border border-neon/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,79,174,0.12)]';
  const closeTone =
    tone === 'paper'
      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      : 'bg-white/[0.06] text-ink-soft hover:bg-white/[0.12] hover:text-ink';

  return createPortal(
    <div
      ref={scope}
      data-dialog=""
      data-print={printable ? '' : undefined}
      className="fixed inset-0 z-[60] flex overflow-y-auto p-3 sm:p-6"
    >
      <div
        data-backdrop=""
        style={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0b0308]/75 backdrop-blur-sm"
        onClick={() => onCloseRef.current()}
      />
      <div
        ref={panelRef}
        data-panel=""
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        style={{ opacity: 0, transformOrigin: '0 0' }}
        // m-auto centers when the panel fits and keeps its top reachable when it is taller than the screen
        className={`relative m-auto w-full ${size === 'md' ? 'max-w-xl' : 'max-w-3xl'} rounded-[28px] p-6 sm:p-9 ${panelTone}`}
      >
        <div data-dialog-content="" style={{ opacity: 0 }}>
          <button
            ref={closeRef}
            type="button"
            onClick={() => onCloseRef.current()}
            aria-label={closeLabel}
            className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full transition-colors print:hidden ${closeTone}`}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
