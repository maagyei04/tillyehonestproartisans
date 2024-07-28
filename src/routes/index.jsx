import { createBrowserRouter } from "react-router-dom";

import MainRoutes from "./MainRoutes";
import ClientDashboardLayout from "./ClientDashboardRoutes";
import ArtisanDashboardRoutes from "./ArtisanDashboardRoutes";
import AdminDashboardRoutes from "./AdminDashboardRoutes";
import AdminRoutes from "./AdminLayoutRoutes";
import ForgotPasswordRoutes from "./ForgotPasswordRoutes";

const router = createBrowserRouter([MainRoutes, ClientDashboardLayout, ArtisanDashboardRoutes, AdminDashboardRoutes, AdminRoutes, ForgotPasswordRoutes], { basename: '/' });

export default router;