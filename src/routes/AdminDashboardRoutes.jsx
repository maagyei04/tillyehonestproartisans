import { lazy } from 'react';

import Loadable from '../components/common/Loadable';
import Dashboard from '../components/layouts/adminDashboard';

const DashboardDefault = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages')));
const Orders = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages/orders')));
const Finance = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages/financial')));
const Profile = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages/profile')));
const Appointment = Loadable(lazy(() => import('../pages/dashboards/admin_dashboard/pages/appointment')));


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
            path: '/admin_dashboard/profile',
            element: <Profile />
        },
        {
            path: '/admin_dashboard/',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
    ]
};

export default AdminDashboardRoutes;
