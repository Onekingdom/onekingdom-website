import { DashboardConfig } from "@/types";

import { LayoutGrid, MessageSquare } from "lucide-react";

export const dashboardConfig: DashboardConfig = {
  overview: {
    routes: [
      {
        label: "Overview",
        href: "/dashboard/overview",
        icon: LayoutGrid,
      },
    ],
  },

  website: {
    title: "Website",
    routes: [
      {
        label: "Events",
        href: "/admin/events/",
        icon: MessageSquare,
      },
      
      
    ],
  },

  // admin: {
  //   title: 'Admin',
  //   routes: [
  //     {
  //       label: 'Admin Panel',
  //       href: '/dashboard/admin',
  //       icon: Lock,
  //     },
  //     {
  //       label: 'Analytics',
  //       href: '/dashboard/analytics',
  //       icon: AreaChart,
  //     },
  //   ],
  // },
};
