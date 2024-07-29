import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Tab from '../../dashboards/artisan_dashboard/components/TabComponent';
import ProductDetail from './productDetail';
import SellerProfile from './sellerProfile';
import OtherProducts from './otherProducts';
import Reviews from './reviews';

const ShopDetailScreen = () => {

    const location = useLocation();
    const { product } = location.state || {};

    console.log(product);

    const [activeTab, setActiveTab] = useState('Products');

    useEffect(() => {
        setActiveTab('Products');
    }, [product]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Products':
                return <ProductDetail product={product} />;
            case 'Seller Profile':
                return <SellerProfile product={product} />;
            case 'Other Products':
                return <OtherProducts product={product} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-0 md:p-1">
            {
                <div className="w-full p-4 py-[130px]">
                    <div className="flex flex-row space-x-4 mb-6">
                        <Tab label="Products" isActive={activeTab === 'Products'} onClick={() => setActiveTab('Products')} />
                        <Tab label="Seller Profile" isActive={activeTab === 'Seller Profile'} onClick={() => setActiveTab('Seller Profile')} />
                        <Tab label="Other Products" isActive={activeTab === 'Other Products'} onClick={() => setActiveTab('Other Products')} />
                    </div>
                    {renderContent()}
                </div>
            }
        </div>
    );
};

export default ShopDetailScreen;