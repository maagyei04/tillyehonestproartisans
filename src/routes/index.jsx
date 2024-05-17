import { createBrowserRouter } from "react-router-dom";

import MainRoutes from "./MainRoutes";
import ClientDashboardLayout from "./ClientDashboardRoutes";
import ArtisanDashboardRoutes from "./ArtisanDashboardRoutes";
import AdminDashboardRoutes from "./AdminDashboardRoutes";

const router = createBrowserRouter([MainRoutes, ClientDashboardLayout, ArtisanDashboardRoutes, AdminDashboardRoutes], { basename: '/' });

export default router;