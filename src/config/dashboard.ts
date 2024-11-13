import {
  BookOpen,
  Target,
  Quote,
  Users,
  Settings,
  Library,
  LayoutDashboard,
  Calendar,
  Image,
  Music,
  Home,
  LineChart,
  User,
  Book,
  MessageSquare,
  Fingerprint,
} from "lucide-react"

export const dashboardConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/home",
      icon: Home,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Core Identity",
      href: "/dashboard/identity",
      icon: Fingerprint,
      items: [
        {
          title: "Identity Statement",
          href: "/dashboard/identity?tab=identity",
        },
        {
          title: "Mission & Values",
          href: "/dashboard/identity?tab=mission-values",
        },
        {
          title: "Vision & Purpose",
          href: "/dashboard/identity?tab=vision-purpose",
        }
      ]
    },
    {
      title: "Planning",
      href: "/dashboard/planning",
      icon: Calendar,
      items: [
        {
          title: "Goals Overview",
          href: "/dashboard/planning/overview",
          description: "View all your plans and goals",
        },
        {
          title: "Long Term",
          href: "/dashboard/planning/long-term",
          description: "10-year and 5-year plans",
        },
        {
          title: "Short Term",
          href: "/dashboard/planning/short-term",
          description: "Monthly and weekly plans",
        },
        {
          title: "Analytics",
          href: "/dashboard/planning/analytics",
          description: "Track your progress and insights",
        },
      ],
    },
    {
      title: "Library",
      href: "/dashboard/library",
      icon: Library,
      items: [
        {
          title: "Books",
          href: "/dashboard/library/books",
          description: "Manage your reading list and progress",
        },
        {
          title: "Quotes",
          href: "/dashboard/library/quotes",
          description: "Favorite quotes and philosophies",
        },
        {
          title: "Notes",
          href: "/dashboard/library/notes",
          description: "Personal notes and reflections",
        },
      ],
    },
    {
      title: "Network",
      href: "/dashboard/network",
      icon: Users,
      items: [
        {
          title: "Mentors",
          href: "/dashboard/network/mentors",
          description: "Manage your mentors and role models",
        },
        {
          title: "Connections",
          href: "/dashboard/network/connections",
          description: "Track important relationships",
        },
      ],
    },
    {
      title: "Media",
      href: "/dashboard/media",
      icon: Music,
      items: [
        {
          title: "Audio",
          href: "/dashboard/media/audio",
          description: "Manage your audio content",
        },
        {
          title: "Vision Board",
          href: "/dashboard/media/vision-board",
          description: "Curate your vision board",
        },
      ],
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: LineChart,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: any
  href: string
  items?: NavItem[]
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: any
  description?: string
} 