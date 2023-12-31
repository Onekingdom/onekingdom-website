"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import Image from "next/image";
import { DashboardConfig } from "@/types";
import { DashboardUserNav } from "./DashboardUserNav";
import { cn } from "@/utils/utils";

interface Props {
  config: DashboardConfig;
}

export function SidebarNav({ config }: Props) {
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState(pathname);
  const { session } = useAppSelector((state) => state.auth);

  //TODO: import session

  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  return (
    <>
      <section className="flex flex-row, justify-between h-full w-full">
        <nav className=" flex flex-col gap-6 px-4 ">
          {Object.values(config).map((category, i) => (
            <ul key={i} className="flex flex-col gap-2">
              <h2 className="text-xs uppercase text-muted-foreground/50">{category.title ?? ""}</h2>
              {category.routes.map((route) => (
                <li key={route.href}>
                  {route.disabled ? (
                    <div className="flex h-8 cursor-not-allowed items-center justify-between gap-2 rounded-md px-2 text-sm text-muted-foreground opacity-50 grayscale">
                      <div className="flex flex-row items-center gap-2 truncate">
                        <route.icon className="h-4 w-4" />
                        <p className="truncate">{route.label}</p>
                      </div>
                      <div className="flex flex-row gap-2">
                        {route.premium && <Crown className="h-4 w-4" />}
                        {route.new && <Badge className="pointer-events-none h-4 rounded px-1.5 text-[0.65rem] text-muted">new</Badge>}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={route.href}
                      onClick={() => setActiveRoute(route.href)}
                      className={cn(
                        "flex h-8 items-center justify-between rounded-md px-2 text-sm text-muted-foreground hover:bg-border/80 hover:text-foreground",
                        activeRoute === route.href ? "bg-border/80 text-foreground" : ""
                      )}
                    >
                      <div className="flex flex-row items-center gap-2 truncate">
                        <route.icon className="h-4 w-4 text-primary" />
                        <p className="truncate">{route.label}</p>
                      </div>
                      <div className="flex flex-row gap-2">
                        {route.premium && <Crown className="h-4 w-4 text-amber-500" />}
                        {route.new && <Badge className="pointer-events-none h-4 rounded px-1.5 text-[0.65rem] text-muted">new</Badge>}
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </section>

      <div className="px-4 py-6">
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <DashboardUserNav user={session} />
        </div>
      </div>
    </>
  );
}
