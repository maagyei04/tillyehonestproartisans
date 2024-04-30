import React from 'react';
import Footer from '../ui/Footer';
import Header from '../ui/Header';

function Layout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
