"use client";
import "@/styles/globals.scss";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/providers/theme-provider";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import store from "./store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <Provider store={store}>
        <body className="min-h-screen">
          <ThemeProvider attribute="class" defaultTheme="dark">
            {path.includes("/admin") || path.includes("/login") ? (
              <>{children}</>
            ) : (
              <>
                <Header />
                <main>{children}</main>
                <Footer />
              </>
            )}
            <Toaster richColors position="top-right" theme="dark" />
          </ThemeProvider>
        </body>
      </Provider>
    </html>
  );
}
