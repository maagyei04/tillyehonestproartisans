import Layout from "../components/layouts/AdminLayout";

import PasswordReset from "../pages/login/password_reset";

const ForgotPasswordRoutes = {
    path: '/forgot-password',
    element: <Layout />,
    children: [
        {
            path: '/forgot-password',
            element: <PasswordReset />,
        },
        {
            path: 'default',
            element: <PasswordReset />,
        },
    ]
}

export default ForgotPasswordRoutes;