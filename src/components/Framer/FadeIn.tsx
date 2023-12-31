"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { useInView, motion, useAnimation, Variants } from "framer-motion";

export interface Props {
  children: ReactNode;
  delay?: number;
  hover?: boolean;
  
}

export default function FadeIn({ children, delay, hover }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  const Variants: Variants = {
    visible: { opacity: 1, transition: { duration: 1, delay: delay ? delay : 0 } },
    hidden: { opacity: 0 },
    hover: { scale: 1.2, transition: { duration: 0.5 } },
    
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={Variants}
      whileHover={hover ? "hover" : ""}
    >
      {children}
    </motion.div>
  );
}
