import { createBrowserRouter } from "react-router-dom";

import MainRoutes from "./MainRoutes";
import ClientDashboardLayout from "./ClientDashboardRoutes";
import ArtisanDashboardRoutes from "./ArtisanDashboardRoutes";
import AdminDashboardRoutes from "./AdminDashboardRoutes";
import AdminRoutes from "./AdminLayoutRoutes";

const router = createBrowserRouter([MainRoutes, ClientDashboardLayout, ArtisanDashboardRoutes, AdminDashboardRoutes, AdminRoutes], { basename: '/' });

export default router;