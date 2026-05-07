"use client"
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  type Transition,
  useReducedMotion,
} from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

type RotatingTextProps = {
  text: string | string[]
  duration?: number
  transition?: Transition
  y?: number
  containerClassName?: string
} & HTMLMotionProps<"div">

function RotatingText({
  text,
  y = -50,
  duration = 2000,
  transition = { duration: 0.3, ease: "easeOut" },
  containerClassName,
  ...props
}: RotatingTextProps) {
  const [index, setIndex] = React.useState(0)
  const reduce = useReducedMotion() ?? false
  const isArray = Array.isArray(text)
  React.useEffect(() => {
    if (!isArray || text.length <= 1) {
      return
    }
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % text.length)
    }, duration)
    return () => clearInterval(interval)
  }, [text, duration, isArray])
  const currentText = isArray ? text[index] : text
  const effectiveTransition: Transition = reduce ? { duration: 0 } : transition
  return (
    <div className={cn("overflow-hidden py-1", containerClassName)}>
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y }}
          initial={reduce ? false : { opacity: 0, y: -y }}
          key={currentText}
          transition={effectiveTransition}
          {...(props as HTMLMotionProps<"div">)}
        >
          {currentText}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export { RotatingText, type RotatingTextProps }
export default RotatingText
