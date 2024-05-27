import React, { useState } from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { updateBookingEstimate } from '../../../../../stores/actions';


const ArtisanEstimate = ({ bookingData }) => {
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        bookingEstimateAmount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();

        try {

            await updateBookingEstimate(bookingData.id, formData.bookingEstimateAmount);

            alert('Appointment Estimate updated successfully');
        } catch (error) {
            console.error('Error updating appointment estimate:', error);
            alert('Error updating appointment estimate');
        } finally {
            setLoading(false);
        }
    };

    return (
        bookingData.bookingEstimateAmount === 0 ?
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Estimate Details</h1>
                    <div className='bg-red-100 text-red-600 px-4 rounded-[10px] mb-5'>
                        <p>Waiting for estimate</p>
                    </div>
                    <div className="flex flex-col mt-5">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Estimate will be forwarded to client immediately after creation by artisan
                            </p>
                        </div>
                    </div>
                </div>
            </>
            :
            <>
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-lg font-bold">Created Estimate</h1>

                    <h1 className="mb-2 text-sm font-semibold mb-5">Esimated Budget By Artisan</h1>
                    <div className='mb-10'>
                        <p className='text-gray-500'>Total Amount</p>
                        <p>GHC {bookingData.bookingEstimateAmount}.00</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Client has received the estimate and is expected to make payment
                            </p>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default ArtisanEstimate;