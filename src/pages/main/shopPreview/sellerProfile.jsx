import React, { useState, useEffect } from 'react';
import { fetchArtisanData } from '../../../stores/actions';

const SellerProfile = ({ product }) => {
    const [artisanData, setArtisanData] = useState(null);

    useEffect(() => {
        const artisanData = async () => {
            try {
                const artisanData = await fetchArtisanData(product.userId);
                setArtisanData(artisanData);
            } catch (error) {
                console.error('Error fetching artisan data:', error);
            }
        };

        artisanData();
    }, [product]);

    if (!product) return null;

    return (
        <div className="flex flex-col md:flex-row p-4 w-full">
            <div className="bg-white shadow-md p-4 mb-4 md:mb-0 md:mr-4 md:w-3/12 rounded-md">
                <img src={artisanData?.passportImage} alt={artisanData?.firstName} className="w-full rounded-md" />
            </div>
            <div>
                <h2 className="text-xl font-semibold">{artisanData?.firstName} {artisanData?.lastName}</h2>
                <div className="mt-2">
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">{artisanData?.businessField} / {artisanData?.businessFieldSecondary}</span>
                    <span className="ml-2">{artisanData?.phoneNumber}</span>
                    <span className="ml-2">{artisanData?.businessLocation}</span>
                </div>
                <p className="mt-4 mb-5">{artisanData?.bio ? artisanData?.bio : 'I have excellent customer service skills and work prudently to bring my work to completion. I offer excellent value for low cost.'}</p>
            </div>
        </div>
    );
};

export default SellerProfile;