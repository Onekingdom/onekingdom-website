import { DashboardConfig } from "@/types";

import { LayoutGrid, MessageSquare, User2 } from "lucide-react";
import { FaPager } from "react-icons/fa6";
import { MdContactPage } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

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
        icon: CiCalendarDate,
        beta: true,
      },
      {
        label: "Members",
        href: "/admin/members/",
        icon: MdContactPage ,
        beta: true,
      },
      {
        label: "Pages",
        href: "/admin/members/",
        icon: FaPager,
        commingSoon: true,
        disabled: true,
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
        disabled: true,
        commingSoon: true,
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
