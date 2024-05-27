import { lazy } from 'react';

import Loadable from '../components/common/Loadable';
import Dashboard from '../components/layouts/artisanDashboard';

const DashboardDefault = Loadable(lazy(() => import('../pages/dashboards/artisan_dashboard/pages')));
const Orders = Loadable(lazy(() => import('../pages/dashboards/artisan_dashboard/pages/orders')));
const Finance = Loadable(lazy(() => import('../pages/dashboards/artisan_dashboard/pages/financial')));
const Profile = Loadable(lazy(() => import('../pages/dashboards/artisan_dashboard/pages/profile')));
const Appointment = Loadable(lazy(() => import('../pages/dashboards/artisan_dashboard/pages/appointment')));

const ArtisanDashboardRoutes = {
    path: '/artisan_dashboard/',
    element: <Dashboard />,
    children: [
        {
            path: '/artisan_dashboard/',
            element: <DashboardDefault />
        },
        {
            path: '/artisan_dashboard/appointments',
            element: <Appointment />
        },
        {
            path: '/artisan_dashboard/orders',
            element: <Orders />
        },
        {
            path: '/artisan_dashboard/financial_history',
            element: <Finance />
        },
        {
            path: '/artisan_dashboard/profile',
            element: <Profile />
        },
        {
            path: 'default',
            element: <DashboardDefault />
        }


    ]
};

export default ArtisanDashboardRoutes;
