import BlogFooter from "@/components/BlogFooter";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BlogFooter />
    </>
  );
}
