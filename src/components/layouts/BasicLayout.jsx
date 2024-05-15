import React from 'react';
import Footer from '../ui/Footer';
import Header from '../ui/Header';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
