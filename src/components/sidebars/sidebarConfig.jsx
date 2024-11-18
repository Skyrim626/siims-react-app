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
  Briefcase,
  FileText,
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
    exact: true, // No exact match needed for partial path
    path: "/auth/admin/users",
    sublinks: [
      {
        text: "Chairpersons",
        path: "/auth/admin/users/chairpersons",
      },
      {
        text: "Companies",
        path: "/auth/admin/users/companies",
        sublinks: [
          {
            text: "Test",
            path: "/auth/admin/users/companies/test",
          },
          /* {
            text: "Companies ID",
            path: "/auth/admin/users/companies/:id", // Dynamic path
          }, */
        ],
      },
    ],
  },

  /* {
    icon: <Building size={20} />,
    text: "Offices",
    alert: true,
    ariaLabel: "Offices",
    exact: false,
    path: "/auth/admin/offices",
  }, */
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

// Configuration for sidebar items for Chairperson
const chairpersonSidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true,
    active: true,
    path: "/auth/chairperson",
  },
  {
    icon: <User size={20} />,
    text: "Students",
    alert: true,
    ariaLabel: "Students",
    exact: false,
    active: true,
    path: "/auth/chairperson/students",
  },
  {
    icon: <Building size={20} />,
    text: "Companies",
    alert: true,
    ariaLabel: "Companies",
    exact: false,
    active: true,
    path: "/auth/chairperson/companies",
    sublinks: [
      {
        text: "Company_ID",
        path: "/auth/chairperson/companies/:company_id", // Dynamic path
      },
    ],
  },
  {
    icon: <FileText size={20} />,
    text: "Endorsement Requests",
    alert: true,
    ariaLabel: "Endorsement Request",
    exact: false,
    active: true,
    path: "/auth/chairperson/endorsement-requests",
  },
];

// Configuration for sidebar items for Supervisor
const supervisorSidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/supervisor",
  },
  {
    icon: <Briefcase size={20} />,
    text: "Manage Jobs",
    alert: true,
    ariaLabel: "Manage Jobs",
    exact: false, // Add an `exact` property for exact path matching
    path: "/auth/supervisor/work-posts",
    sublinks: [
      {
        text: "Add Job",
        path: "/auth/supervisor/work-posts/add", // Dynamic path
      },
      {
        text: "Edit Job",
        path: "/auth/supervisor/work-posts/edit/:id", // Dynamic path
      },
    ],
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
  supervisorSidebarItemsConfig,
  chairpersonSidebarItemsConfig,
};
