import AdminView from "../AdminView";

export const nav = [
  {
    path: "/admin",
    name: "Admin Home View",
    element: <AdminView />,
    isMenu: true,
    isPrivate: true,
  },
];
