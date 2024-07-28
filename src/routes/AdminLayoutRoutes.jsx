import Layout from "../components/layouts/AdminLayout";

import AdminLogin from "../pages/login/admin_login";

const AdminRoutes = {
    path: '/login_admin',
    element: <Layout />,
    children: [
        {
            path: '/login_admin',
            element: <AdminLogin />,
        },
        {
            path: 'default',
            element: <AdminLogin />,
        },
    ]
}

export default AdminRoutes;