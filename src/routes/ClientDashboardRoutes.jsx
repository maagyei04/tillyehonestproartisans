import { lazy } from 'react';

import Loadable from '../components/common/Loadable';
import Dashboard from '../components/layouts/clientDashboard';

const DashboardDefault = Loadable(lazy(() => import('../pages/dashboards/client_dashboard/pages')));
const Orders = Loadable(lazy(() => import('../pages/dashboards/client_dashboard/pages/orders')));
const Finance = Loadable(lazy(() => import('../pages/dashboards/client_dashboard/pages/financial')));
const Profile = Loadable(lazy(() => import('../pages/dashboards/client_dashboard/pages/profile')));
const Appointment = Loadable(lazy(() => import('../pages/dashboards/client_dashboard/pages/appointment')));


const ClientDashboardLayout = {
    path: '/client_dashboard/',
    element: <Dashboard />,
    children: [
        {
            path: '/client_dashboard/',
            element: <DashboardDefault />
        },
        {
            path: '/client_dashboard/appointments',
            element: <Appointment />
        },
        {
            path: '/client_dashboard/orders',
            element: <Orders />
        },
        {
            path: '/client_dashboard/financial_history',
            element: <Finance />
        },
        {
            path: '/client_dashboard/profile',
            element: <Profile />
        },
        {
            path: 'default',
            element: <DashboardDefault />
        }
    ]
};

export default ClientDashboardLayout;
