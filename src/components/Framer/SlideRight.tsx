"use client";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";
import React from "react";

export interface Props {
  children: ReactNode;
}
export default function SlideRight({ children }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{width: "50%"}}>
      <div
        style={{
          transform: isInView ? "none" : "translateX(200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
        }}
      >
        {children}
      </div>
    </div>
  );
}