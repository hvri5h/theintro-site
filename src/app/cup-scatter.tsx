"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

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

type CupProps = {
  className: string;
  rot: number;
  flip?: boolean;
  parallax: number;
  floatAmp: number;
  index: number;
  scrollY: MotionValue<number>;
};

function Cup({
  className,
  rot,
  flip,
  parallax,
  floatAmp,
  index,
  scrollY,
}: CupProps) {
  const direction = rot < 0 ? -1 : 1;

  const xMv = useTransform(scrollY, [0, 700], [0, direction * 60 * parallax]);
  const yMv = useTransform(scrollY, [0, 700], [0, -22 * parallax]);
  const rotateMv = useTransform(
    scrollY,
    [0, 700],
    [rot, rot + direction * 22 * parallax],
  );

  const floatDuration = 4.5 + ((index * 0.31) % 2.5);
  const floatDelay = (index * 0.43) % 3;

  return (
    <div className={`absolute ${className}`}>
      <motion.div
        style={{ x: xMv, y: yMv, rotate: rotateMv }}
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
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden sm:overflow-visible"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* MOBILE — visible below 640px */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* TOP — varied sizes */}
      <Cup className="sm:hidden top-[5%]  left-[8%]  -translate-x-1/2 -translate-y-1/2 w-16 h-16 blur-[4px] opacity-40" rot={15}  parallax={0.5} floatAmp={3} index={0} scrollY={scrollY} />
      <Cup className="sm:hidden top-[10%] left-[78%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 blur-[4px] opacity-40" rot={22}  flip parallax={0.5} floatAmp={3} index={2} scrollY={scrollY} />
      <Cup className="sm:hidden top-0 left-[18%] -translate-x-1/2 w-14 h-14" rot={-12} parallax={1.0} floatAmp={7} index={3} scrollY={scrollY} />
      <Cup className="sm:hidden top-0 left-[82%] -translate-x-1/2 w-12 h-12" rot={10}  flip parallax={1.0} floatAmp={7} index={4} scrollY={scrollY} />

      {/* MIDDLE — peeking from side edges */}
      <Cup className="sm:hidden top-[42%] left-0    -translate-x-1/2 w-24 h-24 blur-[1px] opacity-90" rot={22}  parallax={1.0} floatAmp={5} index={5} scrollY={scrollY} />
      <Cup className="sm:hidden top-[55%] left-full -translate-x-1/2 w-16 h-16 blur-[1px] opacity-90" rot={-8}  flip parallax={1.0} floatAmp={5} index={6} scrollY={scrollY} />

      {/* BOTTOM — small + heavily blurred so they recede behind the CTA */}
      <Cup className="sm:hidden bottom-[7%] left-[6%]  -translate-x-1/2 w-12 h-12 blur-[3px] opacity-50" rot={-15} parallax={0.6} floatAmp={3} index={8}  scrollY={scrollY} />
      <Cup className="sm:hidden bottom-[5%] left-[92%] -translate-x-1/2 w-14 h-14 blur-[3px] opacity-50" rot={18}  flip parallax={0.6} floatAmp={3} index={9}  scrollY={scrollY} />
      <Cup className="sm:hidden bottom-0 left-[14%] -translate-x-1/2 w-10 h-10" rot={18}  parallax={1.0} floatAmp={4} index={10} scrollY={scrollY} />
      <Cup className="sm:hidden bottom-0 left-[86%] -translate-x-1/2 w-14 h-14" rot={-15} flip parallax={1.0} floatAmp={4} index={11} scrollY={scrollY} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* DESKTOP — visible at 640px+ */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* L1 — small heavily blurred, scattered */}
      <Cup className="hidden sm:block sm:top-[8%]  sm:left-[10%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={15}  parallax={0.5} floatAmp={3} index={10} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[14%] sm:left-[25%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-22} flip parallax={0.5} floatAmp={3} index={11} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[8%]  sm:left-[42%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={10}  parallax={0.5} floatAmp={3} index={12} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[12%] sm:left-[58%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-18} parallax={0.5} floatAmp={3} index={13} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[8%]  sm:left-[72%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={22}  flip parallax={0.5} floatAmp={3} index={14} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[22%] sm:left-[92%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-10} parallax={0.5} floatAmp={3} index={15} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[35%] sm:left-[8%]  sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={25}  parallax={0.5} floatAmp={3} index={16} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[58%] sm:left-[32%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-15} parallax={0.5} floatAmp={3} index={17} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[58%] sm:left-[68%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={20}  flip parallax={0.5} floatAmp={3} index={18} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[58%] sm:left-[88%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-12} parallax={0.5} floatAmp={3} index={19} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[82%] sm:left-[40%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={-25} parallax={0.5} floatAmp={3} index={20} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[85%] sm:left-[60%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-14 sm:h-14 sm:blur-[5px] sm:opacity-50" rot={15}  flip parallax={0.5} floatAmp={3} index={21} scrollY={scrollY} />

      {/* L2 — mid size, slight blur */}
      <Cup className="hidden sm:block sm:top-[2%]  sm:left-[15%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={-10} flip parallax={1.0} floatAmp={5} index={22} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[4%]  sm:left-[85%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={12}  parallax={1.0} floatAmp={5} index={23} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[45%] sm:left-[10%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={22}  parallax={1.0} floatAmp={5} index={24} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[48%] sm:left-[90%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={-8}  flip parallax={1.0} floatAmp={5} index={25} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[95%] sm:left-[18%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={-15} parallax={1.0} floatAmp={5} index={26} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[95%] sm:left-[82%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-24 sm:h-24 sm:blur-[1.5px] sm:opacity-90" rot={18}  flip parallax={1.0} floatAmp={5} index={27} scrollY={scrollY} />

      {/* L3 — large sharp, corners */}
      <Cup className="hidden sm:block sm:top-[15%] sm:left-[14%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-36 sm:h-36" rot={-12} parallax={1.0} floatAmp={7} index={28} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[12%] sm:left-[86%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-36 sm:h-36" rot={10}  flip parallax={1.0} floatAmp={7} index={29} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[78%] sm:left-[14%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-36 sm:h-36" rot={18}  parallax={1.0} floatAmp={7} index={30} scrollY={scrollY} />
      <Cup className="hidden sm:block sm:top-[80%] sm:left-[86%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-36 sm:h-36" rot={-15} flip parallax={1.0} floatAmp={7} index={31} scrollY={scrollY} />
    </div>
  );
}
