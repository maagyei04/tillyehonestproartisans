import { lazy } from 'react';

import Loadable from '../components/common/Loadable';
import Dashboard from '../components/layouts/clientDashboard';

const Color = Loadable(lazy(() => import('../pages/main/About')));

const ArtisanDashboardRoutes = {
    path: '/artisan_dashboard/',
    element: <Dashboard />,
    children: [
        {
            path: '/artisan_dashboard/',
            element: <Color />
        },
        {
            path: '/artisan_dashboard/color',
            element: <Color />
        },
        {
            path: '/artisan_dashboard/',
            children: [
                {
                    path: 'default',
                    element: <Color />
                }
            ]
        },
        {
            path: '/artisan_dashboard/shadow',
            element: <Color />
        },
        {
            path: '/artisan_dashboard/typography',
            element: <Color />
        }
    ]
};

export default ArtisanDashboardRoutes;
