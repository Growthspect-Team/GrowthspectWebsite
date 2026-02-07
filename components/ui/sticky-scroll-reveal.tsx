import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  className,
}: {
  content: {
    title: string;
    description: string | React.ReactNode;
    content?: React.ReactNode | any;
    icon?: React.ReactNode;
  }[];
  contentClassName?: string;
  className?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // target: ref,
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "transparent",
    "transparent",
    "transparent",
  ];
  
  return (
    <motion.div
      className={cn(
        "h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide scroll-smooth",
        className
      )}
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-white mb-4"
              >
                {item.title}
              </motion.h2>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-gray-400 max-w-sm mt-10"
              >
                {item.description}
              </motion.div>
              
              {/* Mobile View Content */}
              <div className="block md:hidden mt-8 w-full md:w-auto">
                 {item.content}
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundColors[activeCard % backgroundColors.length] }}
        className={cn(
          "hidden md:block h-60 w-80 rounded-md sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
