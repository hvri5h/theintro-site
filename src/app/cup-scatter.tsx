"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const SCROLL_END = 900; // px — reference scroll distance; per-cup completion is staggered around this
const X_EXIT_BASE = 350; // px — minimum horizontal travel toward nearest edge
const X_EXIT_RANGE = 600; // px — extra horizontal travel scaled by parallax
const Y_EXIT = -50; // px — gentle upward drift
const ROT_EXIT_BASE = 22; // deg — minimum outward lean toward exit edge
const ROT_EXIT_TILT_FACTOR = 1.6; // multiplier on |rot| — more-tilted cups lean further
const ROT_EXIT_VARIANCE = 24; // deg — extra per-cup spread so no two cups rotate the same amount
const ROT_SCROLL_RATIO = 0.35; // rotation finishes in the first 35% of each cup's exit
// Each cup's variance ∈ [0,1] is derived from its index so timing/magnitude are
// deterministic across SSR but every cup feels independent.

/**
 * Each <Cup> is fully self-described via its className.
 *
 * Position the cup with Tailwind utilities:
 *   - top-[N%] / bottom-[N%] / left-[N%]       → place anchor point
 *   - top-0 / bottom-0 / left-0 / left-full    → flush to a section edge
 *   - -translate-x-1/2                          → centre the cup on its left value
 *   - -translate-y-1/2                          → centre on top value (omit for "top edge at top:N")
 *
 * Size: w-12 h-12, w-20 h-20, w-36 h-36, etc.
 * Blur/opacity: blur-[Npx], opacity-40, opacity-90, etc.
 *
 * Show/hide per breakpoint with `sm:hidden` (hide ≥640) or `hidden sm:block` (hide <640).
 */

type Exit = "left" | "right";

type CupProps = {
  className: string;
  rot: number;
  flip?: boolean;
  parallax: number;
  floatAmp: number;
  index: number;
  exit: Exit;
  scrollY: MotionValue<number>;
  reduce: boolean;
};

function Cup({
  className,
  rot,
  flip,
  parallax,
  floatAmp,
  index,
  exit,
  scrollY,
  reduce,
}: CupProps) {
  const xDirection = exit === "right" ? 1 : -1;
  // Per-cup variance ∈ [0,1] — deterministic from index so it's stable across renders.
  const variance = (index * 0.37 + 0.13) % 1;

  // Each cup completes its exit at a staggered scroll position (70%–125% of SCROLL_END)
  // so they don't all finish in unison — kills the "doors opening" feel.
  const cupScrollEnd = SCROLL_END * (0.7 + 0.55 * variance);

  // Magnitude varies per cup on top of parallax depth.
  const speedMult = 0.7 + 0.6 * variance; // 0.7–1.3
  const xExit = xDirection * (X_EXIT_BASE + X_EXIT_RANGE * parallax) * speedMult;

  // Rotation outward — leans toward the exit edge. Magnitude scales with the
  // cup's resting tilt and its own variance so each cup pivots differently.
  const rotMagnitude =
    ROT_EXIT_BASE + Math.abs(rot) * ROT_EXIT_TILT_FACTOR + ROT_EXIT_VARIANCE * variance;
  const rotExit = xDirection * rotMagnitude;

  // Fade also staggered per cup so the disappearance isn't synchronized.
  const fadeStart = cupScrollEnd * (0.5 + 0.2 * variance);

  const xMv = useTransform(scrollY, [0, cupScrollEnd], [0, xExit]);
  const yMv = useTransform(scrollY, [0, cupScrollEnd], [0, Y_EXIT * parallax * speedMult]);
  const rotateMv = useTransform(
    scrollY,
    [0, cupScrollEnd * ROT_SCROLL_RATIO],
    [rot, rot + rotExit],
  );
  const opacityMv = useTransform(scrollY, [0, fadeStart, cupScrollEnd], [1, 1, 0]);

  if (reduce) {
    return (
      <div className={`absolute ${className}`}>
        <div className="h-full w-full" style={{ transform: `rotate(${rot}deg)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/coffee-cup.png"
            alt=""
            className="h-full w-full"
            style={flip ? { transform: "scaleX(-1)" } : undefined}
          />
        </div>
      </div>
    );
  }

  const floatDuration = 4.5 + ((index * 0.31) % 2.5);
  const floatDelay = (index * 0.43) % 3;

  return (
    <div className={`absolute ${className}`}>
      <motion.div
        style={{ x: xMv, y: yMv, rotate: rotateMv, opacity: opacityMv }}
        className="h-full w-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/coffee-cup.png"
          alt=""
          className="h-full w-full"
          animate={{
            y: [0, -floatAmp, 0, floatAmp * 0.6, 0],
            rotate: [0, 1.5, 0, -1.5, 0],
          }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay,
          }}
          style={{ scaleX: flip ? -1 : 1 }}
        />
      </motion.div>
    </div>
  );
}

export function CupScatter() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });
  const reduce = useReducedMotion() ?? false;
  const driver = reduce ? scrollY : smoothScrollY;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden sm:overflow-visible"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* MOBILE — visible below 640px */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* TOP — varied sizes */}
      <Cup className="sm:hidden top-[5%]  left-[8%]  -translate-x-1/2 -translate-y-1/2 w-16 h-16 blur-[4px] opacity-40" rot={15}  parallax={0.5} floatAmp={3} index={0}  exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="sm:hidden top-[10%] left-[78%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 blur-[4px] opacity-40" rot={22}  flip parallax={0.5} floatAmp={3} index={2}  exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="sm:hidden top-0 left-[18%] -translate-x-1/2 w-14 h-14" rot={-12} parallax={1.0} floatAmp={7} index={3} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="sm:hidden top-0 left-[82%] -translate-x-1/2 w-12 h-12" rot={10}  flip parallax={1.0} floatAmp={7} index={4} exit="right" scrollY={driver} reduce={reduce} />

      {/* MIDDLE — peeking from side edges */}
      <Cup className="sm:hidden top-[42%] left-0    -translate-x-1/2 w-24 h-24 blur-[1px] opacity-90" rot={22}  parallax={1.0} floatAmp={5} index={5} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="sm:hidden top-[55%] left-full -translate-x-1/2 w-16 h-16 blur-[1px] opacity-90" rot={-8}  flip parallax={1.0} floatAmp={5} index={6} exit="right" scrollY={driver} reduce={reduce} />

      {/* BOTTOM — small + heavily blurred so they recede behind the CTA */}
      <Cup className="sm:hidden bottom-[7%] left-[6%]  -translate-x-1/2 w-12 h-12 blur-[3px] opacity-50" rot={-15} parallax={0.6} floatAmp={3} index={8}  exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="sm:hidden bottom-[5%] left-[92%] -translate-x-1/2 w-14 h-14 blur-[3px] opacity-50" rot={18}  flip parallax={0.6} floatAmp={3} index={9}  exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="sm:hidden bottom-0 left-[14%] -translate-x-1/2 w-10 h-10" rot={18}  parallax={1.0} floatAmp={4} index={10} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="sm:hidden bottom-0 left-[86%] -translate-x-1/2 w-14 h-14" rot={-15} flip parallax={1.0} floatAmp={4} index={11} exit="right" scrollY={driver} reduce={reduce} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* DESKTOP — visible at 640px+ */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* L1 — small heavily blurred, scattered */}
      <Cup className="hidden sm:block sm:top-[8%]  sm:left-[10%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={15}  parallax={0.5} floatAmp={3} index={10} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[14%] sm:left-[25%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-22} flip parallax={0.5} floatAmp={3} index={11} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[8%]  sm:left-[42%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={10}  parallax={0.5} floatAmp={3} index={12} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[12%] sm:left-[58%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-18} parallax={0.5} floatAmp={3} index={13} exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[8%]  sm:left-[72%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={22}  flip parallax={0.5} floatAmp={3} index={14} exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[22%] sm:left-[92%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-10} parallax={0.5} floatAmp={3} index={15} exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[35%] sm:left-[8%]  sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={25}  parallax={0.5} floatAmp={3} index={16} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[58%] sm:left-[32%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-15} parallax={0.5} floatAmp={3} index={17} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[58%] sm:left-[68%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={20}  flip parallax={0.5} floatAmp={3} index={18} exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[58%] sm:left-[88%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-12} parallax={0.5} floatAmp={3} index={19} exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[82%] sm:left-[40%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-25} parallax={0.5} floatAmp={3} index={20} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[85%] sm:left-[60%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={15}  flip parallax={0.5} floatAmp={3} index={21} exit="right" scrollY={driver} reduce={reduce} />

      {/* L2 — mid size, slight blur */}
      <Cup className="hidden sm:block sm:top-[2%]  sm:left-[15%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={-10} flip parallax={1.0} floatAmp={5} index={22} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[4%]  sm:left-[85%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={12}  parallax={1.0} floatAmp={5} index={23} exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[45%] sm:left-[10%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={22}  parallax={1.0} floatAmp={5} index={24} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[48%] sm:left-[90%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={-8}  flip parallax={1.0} floatAmp={5} index={25} exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[95%] sm:left-[18%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={-15} parallax={1.0} floatAmp={5} index={26} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[95%] sm:left-[82%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={18}  flip parallax={1.0} floatAmp={5} index={27} exit="right" scrollY={driver} reduce={reduce} />

      {/* L3 — large sharp, corners */}
      <Cup className="hidden sm:block sm:top-[15%] sm:left-[14%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-36 sm:h-36" rot={-12} parallax={1.0} floatAmp={7} index={28} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[12%] sm:left-[86%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-36 sm:h-36" rot={10}  flip parallax={1.0} floatAmp={7} index={29} exit="right" scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[78%] sm:left-[14%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-36 sm:h-36" rot={18}  parallax={1.0} floatAmp={7} index={30} exit="left"  scrollY={driver} reduce={reduce} />
      <Cup className="hidden sm:block sm:top-[80%] sm:left-[86%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-36 sm:h-36" rot={-15} flip parallax={1.0} floatAmp={7} index={31} exit="right" scrollY={driver} reduce={reduce} />
    </div>
  );
}
