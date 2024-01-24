import { DashboardConfig } from "@/types";

import { LayoutGrid, MessageSquare, User2 } from "lucide-react";

export const dashboardConfig: DashboardConfig = {
  overview: {
    routes: [
      {
        label: "Overview",
        href: "/admin",
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
  community: {
    title: "Community",
    routes: [
      {
        label: "User Management",
        href: "/admin/user-management/",
        icon: User2,
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
