"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/globals.scss";
import "@/styles/plugins.scss";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <html lang="en">
      <Provider store={store}>
        <body className="min-h-screen">
        <Toaster richColors position="top-right" theme="dark" />
          {path.includes("/admin") || path.includes("/login") ? (
            <>{children}</>
          ) : (
            <>
              <Header />
              {children}
              <Footer />
            </>
          )}
        </body>
      </Provider>
    </html>
  );
}
