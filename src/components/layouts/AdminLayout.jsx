import React from 'react';
import { Outlet } from 'react-router-dom';

import ScrollToTop from '../common/ScrollToTop';

function AdminLayout() {
    return (
        <div>
            <main>
                <ScrollToTop />
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
