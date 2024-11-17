import {
  BookCopy,
  Building,
  ClipboardList,
  LayoutDashboard,
  Logs,
  MessageCircle,
  User,
  Presentation,
  File,
} from "lucide-react";

// Configuration for sidebar items for Admin
const adminSidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/admin",
  },
  {
    icon: <File />,
    text: "Document Types",
    alert: true,
    ariaLabel: "Document Types",
    exact: true,
    path: "/auth/admin/document-types",
  },
  {
    icon: <ClipboardList />,
    text: "Roles",
    alert: true,
    ariaLabel: "Roles",
    exact: true,
    path: "/auth/admin/roles",
  },
  {
    icon: <Building size={20} />,
    text: "Colleges",
    alert: true,
    ariaLabel: "Colleges",
    exact: false,
    path: "/auth/admin/colleges",
  },
  {
    icon: <Presentation size={20} />,
    text: "Programs",
    alert: true,
    ariaLabel: "Programs",
    exact: false,
    path: "/auth/admin/programs",
  },
  {
    icon: <User size={20} />,
    text: "Users",
    alert: true,
    ariaLabel: "Users",
    exact: false, // No exact match needed for partial path
    path: "/auth/admin/users",
  },

  {
    icon: <Building size={20} />,
    text: "Offices",
    alert: true,
    ariaLabel: "Offices",
    exact: false,
    path: "/auth/admin/offices",
  },
  {
    icon: <MessageCircle size={20} />,
    text: "Messages",
    alert: true,
    ariaLabel: "Messages",
    exact: false,
    path: "/auth/admin/messages",
  },
  {
    icon: <BookCopy size={20} />,
    text: "Internship Postings",
    alert: true,
    ariaLabel: "Internship Postings",
    exact: false,
    path: "/auth/admin/internship-postings",
  },
  { isDivider: true, role: "all" },
  {
    icon: <Logs size={20} />,
    text: "Logs",
    alert: true,
    ariaLabel: "Logs",
    exact: false,
    path: "/auth/admin/logs",
  },
];

// Configuration for sidebar items for OSA
const osaSidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/osa",
  },
  {
    icon: <File />,
    text: "Document Types",
    alert: true,
    ariaLabel: "Document Types",
    exact: true,
    path: "/auth/osa/document-types",
  },
];

// Configuration for sidebar items for Dean
const deanSidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/dean",
  },
  {
    icon: <User size={20} />,
    text: "Profile",
    alert: true,
    ariaLabel: "Profile",
    exact: true,
    path: "/auth/dean/profile",
  },
  {
    icon: <Presentation size={20} />,
    text: "Programs",
    alert: true,
    ariaLabel: "Programs",
    exact: false,
    path: "/auth/dean/programs",
  },
  {
    icon: <Building size={20} />,
    text: "Companies",
    alert: true,
    ariaLabel: "Companies",
    exact: false,
    path: "/auth/dean/companies",
    sublinks: [
      {
        text: "Company_ID",
        path: "/auth/dean/companies/:company_id", // Dynamic path
      },
    ],
  },
];

export {
  adminSidebarItemsConfig,
  deanSidebarItemsConfig,
  osaSidebarItemsConfig,
};
