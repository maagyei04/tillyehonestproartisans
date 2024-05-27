import { lazy } from 'react';

import Loadable from '../components/common/Loadable';
import Dashboard from '../components/layouts/adminDashboard';

const DashboardDefault = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages')));
const Orders = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages/orders')));
const Finance = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages/financial')));
const Appointment = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages/appointment')));
const Clients = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages/clients')));
const Artisans = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages/artisans')));


const AdminDashboardRoutes = {
    path: '/admin_dashboard/',
    element: <Dashboard />,
    children: [
        {
            path: '/admin_dashboard/',
            element: <DashboardDefault />
        },
        {
            path: '/admin_dashboard/appointments',
            element: <Appointment />
        },
        {
            path: '/admin_dashboard/orders',
            element: <Orders />
        },
        {
            path: '/admin_dashboard/financial_history',
            element: <Finance />
        },
        {
            path: '/admin_dashboard/clients',
            element: <Clients />
        },
        {
            path: '/admin_dashboard/artisans',
            element: <Artisans />
        },
        {
            path: 'default',
            element: <DashboardDefault />
        }
    ]
};

export default AdminDashboardRoutes;
