import {
  Building,
  LayoutDashboard,
  Logs,
  User,
  Presentation,
  File,
  Briefcase,
  FileText,
  Users,
  UserSearch,
  UserRoundCheck,
  UserPen,
  ClipboardCheck,
  NotebookPen,
  ContactRound,
  FileCheck,
  NotepadText,
  ScrollText,
  FilePlus,
  Section,
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
    icon: <FilePlus size={20} />,
    text: "Manage Sections",
    alert: true,
    ariaLabel: "Manage Sections",
    exact: true,
    path: "/auth/admin/sections",
  },
  {
    icon: <File size={20} />,
    text: "Document Types",
    alert: true,
    ariaLabel: "Document Types",
    exact: true,
    path: "/auth/admin/document-types",
  },
  /* {
    icon: <ClipboardList />,
    text: "Roles",
    alert: true,
    ariaLabel: "Roles",
    exact: true,
    path: "/auth/admin/roles",
    sublinks: [
      {
        text: "Roles",
        path: "/auth/admin//user-roles",
      },
    ],
  }, */

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
    alert: false,
    ariaLabel: "Users",
    exact: false, // No exact match needed for partial path
    path: "/auth/admin/users",
    sublinks: [
      {
        text: "Deans",
        path: "/auth/admin/users/deans",
      },
      {
        text: "Chairpersons",
        path: "/auth/admin/users/chairpersons",
      },
      {
        text: "Coordinators",
        path: "/auth/admin/users/coordinators",
      },
      {
        text: "Companies",
        path: "/auth/admin/users/companies",
        sublinks: [
          {
            text: "company_id",
            path: "/auth/admin/users/companies/:company_id", // Dynamic path
          },
        ],
      },
      {
        text: "Students",
        path: "/auth/admin/users/students",
      },
      {
        text: "user_id",
        path: "/auth/admin/users/deans/:user_id", // Dynamic path
      },
      {
        text: "user_id",
        path: "/auth/admin/users/chairpersons/:user_id", // Dynamic path
      },
      {
        text: "user_id",
        path: "/auth/admin/users/coordinators/:user_id", // Dynamic path
      },
      {
        text: "user_id",
        path: "/auth/admin/users/students/:user_id", // Dynamic path
      },
      {
        text: "user_id",
        path: "/auth/admin/users/companies/:user_id", // Dynamic path
      },
    ],
  },
  {
    icon: <ScrollText size={20} />,
    text: "Manual Endorsement Letter",
    alert: true,
    ariaLabel: "Manual Endorsement Letter",
    exact: false,
    active: true,
    path: "/auth/admin/manual-create-endorsement-letter",
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
    icon: <User size={20} />,
    text: "Profile",
    alert: false,
    ariaLabel: "Profile",
    exact: false,
    path: "/auth/coordinator/profile",
    sublinks: [
      {
        text: "Edit",
        path: "/auth/coordinator/profile/edit", // Dynamic path
      },
    ],
  },
  {
    icon: <Section size={20} />,
    text: "Sections",
    alert: true,
    ariaLabel: "Sections",
    exact: false,
    active: false,
    path: "/auth/coordinator/sections",
  },

  {
    icon: <Users size={20} />,
    text: "Students",
    alert: true,
    ariaLabel: "Students",
    exact: false,
    active: false,
    path: "/auth/coordinator/students",
  },
  {
    icon: <Users size={20} />,
    text: "My Student's Reports",
    alert: false,
    ariaLabel: "My Student's Reports",
    exact: false,
    active: false,
    path: "/auth/coordinator/my-students-reports",
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
    text: "Profile",
    alert: false,
    ariaLabel: "Profile",
    exact: false,
    path: "/auth/chairperson/profile",
    sublinks: [
      {
        text: "Edit",
        path: "/auth/chairperson/profile/edit", // Dynamic path
      },
    ],
  },
  {
    icon: <UserRoundCheck size={20} />,
    text: "Coordinators",
    alert: true,
    ariaLabel: "Coordinators",
    exact: false,
    active: true,
    path: "/auth/chairperson/coordinators",
    sublinks: [
      {
        text: "user_id",
        path: "/auth/chairperson/coordinators/:user_id", // Dynamic path
      },
    ],
  },
  {
    icon: <User size={20} />,
    text: "Students",
    alert: true,
    ariaLabel: "Students",
    exact: false,
    active: true,
    path: "/auth/chairperson/students",
    sublinks: [
      {
        text: "User_id",
        path: "/auth/chairperson/students/:user_id", // Dynamic path
      },
    ],
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
  {
    icon: <ScrollText size={20} />,
    text: "Manual Endorsement Letter",
    alert: true,
    ariaLabel: "Manual Endorsement Letter",
    exact: false,
    active: true,
    path: "/auth/chairperson/manual-create-endorsement-letter",
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
    icon: <User size={20} />,
    text: "Profile",
    alert: false,
    ariaLabel: "Profile",
    exact: false,
    path: "/auth/supervisor/profile",
    sublinks: [
      {
        text: "Edit",
        path: "/auth/supervisor/profile/edit", // Dynamic path
      },
    ],
  },
  /* {
    icon: <Users size={20} />,
    text: "Interns",
    alert: true,
    ariaLabel: "Interns",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/supervisor/interns",
  }, */
  /* {
    icon: <Users size={20} />,
    text: "Applicants",
    alert: true,
    ariaLabel: "Applicants",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/supervisor/applicants",
  }, */

  /*  {
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
  }, */
  {
    icon: <NotepadText size={20} />,
    text: "Reports",
    alert: false,
    ariaLabel: "Reports",
    exact: false, // Add an `exact` property for exact path matching
    path: "/auth/supervisor/reports",
    sublinks: [
      /* {
        text: "ID",
        path: "/auth/supervisor/reports/:id", // Dynamic path
      }, */
      {
        text: "Daily Time Records",
        path: "/auth/supervisor/reports/:id/daily-time-records", // Dynamic path
      },
      {
        text: "Weekly Reports",
        path: "/auth/supervisor/reports/:id/weekly-accomplishment-reports", // Dynamic path
      },
      {
        text: "Performance Evaluation",
        path: "/auth/supervisor/reports/:id/performance-evaluation", // Dynamic path
      },
    ],
  },
  /* {
    icon: <ClipboardCheck size={20} />,
    text: "Evaluation",
    alert: true,
    ariaLabel: "Evaluation",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/supervisor/performance-evaluation",
  }, */
  /* {
    icon: <ContactRound size={20} />,
    text: "Trainees",
    alert: false,
    ariaLabel: "Trainees",
    exact: false, // Add an `exact` property for exact path matching
    path: "/auth/supervisor/trainees",
  }, */
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
    alert: false,
    ariaLabel: "Profile",
    exact: false,
    path: "/auth/company/profile",
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
    icon: <Briefcase size={20} />,
    text: "Manage Jobs",
    alert: true,
    ariaLabel: "Manage Jobs",
    exact: false, // Add an `exact` property for exact path matching
    path: "/auth/company/work-posts",
  },
  {
    icon: <Users size={20} />,
    text: "Supervisors",
    alert: true,
    ariaLabel: "Supervisors",
    exact: true,
    path: "/auth/company/supervisors",
  },
  {
    icon: <UserSearch size={20} />,
    text: "Applicants",
    alert: false,
    ariaLabel: "Applicants",
    exact: false,
    path: "/auth/company/applicants",
    sublinks: [
      {
        text: "application_id",
        path: "/auth/company/applicants/:application_id", // Dynamic path
      },
      {
        text: "Generate Acceptance Letter",
        path: "/auth/company/applicants/:application_id/generate-acceptance", // Dynamic path
      },
    ],
  },
  {
    icon: <NotebookPen size={20} />,
    text: "Reports",
    alert: true,
    ariaLabel: "Reports",
    exact: false,
    path: "/auth/company/reports",
  },
  /* {
    icon: <ContactRound size={20} />,
    text: "Manage Interns",
    alert: true,
    ariaLabel: "Manage Interns",
    exact: false,
    path: "/auth/company/interns",
  }, */
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
    icon: <User size={20} />,
    text: "Profile",
    alert: true,
    ariaLabel: "Profile",
    exact: true, // Add an `exact` property for exact path matching
    path: "/auth/osa/profile",
  },
  {
    icon: <Users size={20} />,
    text: "Applicants",
    alert: false,
    ariaLabel: "Applicants",
    exact: false, // Add an `exact` property for exact path matching
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
    alert: false,
    ariaLabel: "Profile",
    exact: false,
    path: "/auth/dean/profile",
    sublinks: [
      {
        text: "Edit",
        path: "/auth/dean/profile/edit", // Dynamic path
      },
    ],
  },
  {
    icon: <UserPen />,
    text: "Coordinators",
    alert: true,
    ariaLabel: "Coordinators",
    exact: true,
    path: "/auth/dean/coordinators",
    sublinks: [
      {
        text: "User_id",
        path: "/auth/dean/coordinators/:user_id", // Dynamic path
      },
    ],
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
    icon: <Users size={20} />,
    text: "Students",
    alert: true,
    ariaLabel: "Students",
    exact: false,
    path: "/auth/dean/students",
    sublinks: [
      {
        text: "user_id",
        path: "/auth/dean/students/:user_id", // Dynamic path
      },
    ],
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
        text: "user_id",
        path: "/auth/dean/companies/:user_id", // Dynamic path
      },
    ],
  },
  {
    icon: <FileCheck size={20} />,
    text: "Endorsement Approval",
    alert: true,
    ariaLabel: "Endorsement",
    exact: false,
    path: "/auth/dean/endorsement-letter-requests",
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
