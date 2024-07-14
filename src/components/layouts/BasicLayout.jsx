import React from 'react';
import Footer from '../ui/Footer';
import Header from '../ui/Header';
import { Outlet } from 'react-router-dom';

import ScrollToTop from '../common/ScrollToTop';
import WhatsAppButton from '../common/WhatsappButton';

function Layout() {
    return (
        <div>
            <Header />
            <main>
                <ScrollToTop />
                <Outlet />
                <WhatsAppButton />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
