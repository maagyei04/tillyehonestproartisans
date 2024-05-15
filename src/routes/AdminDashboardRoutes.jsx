import { lazy } from 'react';

import Loadable from '../components/common/Loadable';
import Dashboard from '../components/layouts/clientDashboard';

const Color = Loadable(lazy(() => import('../pages/main/About')));

const AdminDashboardRoutes = {
    path: '/admin_dashboard/',
    element: <Dashboard />,
    children: [
        {
            path: '/admin_dashboard/',
            element: <Color />
        },
        {
            path: '/admin_dashboard/color',
            element: <Color />
        },
        {
            path: '/admin_dashboard/',
            children: [
                {
                    path: 'default',
                    element: <Color />
                }
            ]
        },
        {
            path: '/admin_dashboard/shadow',
            element: <Color />
        },
        {
            path: '/admin_dashboard/typography',
            element: <Color />
        }
    ]
};

export default AdminDashboardRoutes;
