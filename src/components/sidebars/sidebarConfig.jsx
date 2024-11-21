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
  Users,
  UserRoundCheck,
  UserPen,
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

// Configuration for sidebar items for Coordinator
const coordinatorSidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true,
    active: true,
    path: "/auth/coordinator",
  },
  {
    icon: <UserPen size={20} />,
    text: "My Profile",
    alert: true,
    ariaLabel: "My Profile",
    exact: true,
    active: true,
    path: "/auth/coordinator/profile",
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
    icon: <UserRoundCheck size={20} />,
    text: "Coordinators",
    alert: true,
    ariaLabel: "Coordinators",
    exact: false,
    active: true,
    path: "/auth/chairperson/coordinators",
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
    icon: <Users size={20} />,
    text: "Applicants",
    alert: true,
    ariaLabel: "Applicants",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/supervisor/applicants",
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

// Configuration for sidebar items for Company
const companySidebarItemsConfig = [
  {
    icon: <LayoutDashboard size={20} />,
    text: "Dashboard",
    alert: true,
    ariaLabel: "Dashboard",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/company",
  },

  {
    icon: <User size={20} />,
    text: "Profile",
    alert: true,
    ariaLabel: "Profile",
    exact: true,
    path: "/auth/company/profile",
  },
  {
    icon: <Briefcase size={20} />,
    text: "Manage Jobs",
    alert: true,
    ariaLabel: "Manage Jobs",
    exact: false, // Add an `exact` property for exact path matching
    path: "/auth/company/work-posts",
  },
  {
    icon: <Building size={20} />,
    text: "Offices",
    alert: true,
    ariaLabel: "Offices",
    exact: false,
    path: "/auth/company/offices",
    sublinks: [
      {
        text: "Add Office",
        path: "/auth/company/offices/add", // Dynamic path
      },
    ],
  },
  {
    icon: <Users size={20} />,
    text: "Supervisors",
    alert: true,
    ariaLabel: "Supervisors",
    exact: true,
    path: "/auth/company/supervisors",
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
    icon: <Users size={20} />,
    text: "Applicants",
    alert: true,
    ariaLabel: "Applicants",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/osa/applicants",
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
  companySidebarItemsConfig,
  coordinatorSidebarItemsConfig,
};
