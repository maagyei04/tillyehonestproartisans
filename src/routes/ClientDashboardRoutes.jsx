import { lazy } from 'react';

import Loadable from '../components/common/Loadable';
import Dashboard from '../components/layouts/clientDashboard';

const Color = Loadable(lazy(() => import('../pages/main/About')));
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboards/client_dashboard/pages')));

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
            element: <Color />
        },

        {
            path: '/client_dashboard/explore',
            element: <Color />
        },
        {
            path: '/client_dashboard/orders',
            element: <Color />
        },
        {
            path: '/client_dashboard/financial_history',
            element: <Color />
        },
        {
            path: '/client_dashboard/profile',
            element: <Color />
        },
        {
            path: '/client_dashboard/',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
    ]
};

export default ClientDashboardLayout;
