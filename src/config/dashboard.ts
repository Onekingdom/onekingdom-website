import { DashboardConfig } from "@/types";

import { LayoutGrid, MessageSquare, Layers, Hexagon, ScrollText  } from "lucide-react";

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

  twitch: {
    title: "Twitch",
    routes: [
      {
        label: "Commands",
        href: "/dashboard/twitch/commands",
        icon: MessageSquare,
      },
      {
        label: "Overlay",
        href: "/dashboard/twitch/overlay",
        icon: Layers,
      },
      {
        label: "ChannelPoints",
        href: "/dashboard/twitch/channelpoints",
        icon: Hexagon,
      },
      {
        label: "Scripts",
        href: "/dashboard/scripts/",
        icon: ScrollText,
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
