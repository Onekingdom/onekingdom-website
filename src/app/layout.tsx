"use client";
import "@/styles/globals.scss";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/providers/theme-provider";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import store from "./store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <html lang="en">
      <Provider store={store}>
        <body className="min-h-screen">
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            {path.includes("/admin") || path.includes("/login") ? (
              <main>{children}</main>
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
