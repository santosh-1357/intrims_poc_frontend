// contains all sidebar routes
const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/",
    icon: "home",
    isSideBarRoute: true,
  },
  {
    name: "Export Declaration",
    layout: "/admin",
    path: "export-declaration",
    icon: "documents",
    isSideBarRoute: true,
  },
  {
    name: "Demo",
    layout: "/admin",
    path: "demo",
    icon: "bar-chart",
    isSideBarRoute: true,
  },
];
export default routes;
