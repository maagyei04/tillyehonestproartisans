import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { updateBookingStatusArtisan } from '../../../../../stores/actions';


const ArtisanComplete = ({ bookingData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (e) => {
        setOpen(false);

        setLoading(true);

        e.preventDefault();

        try {

            await updateBookingStatusArtisan(bookingData.id, 'complete');

            alert('Booking has been marked as completed!');
        } catch (error) {
            console.error('Error marking booking as completed:', error);
            alert('Error marking booking as completed:');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                <h1 className="mb-2 text-sm font-bold">Artisan Work Update</h1>
                <div className={bookingData.bookingStatusArtisan === 'complete' ? 'bg-green-100 text-green-600 px-4 rounded-[10px] mb-2' : 'bg-red-100 text-red-600 px-4 rounded-[10px] mb-2'}>
                    <p>{bookingData.bookingStatusArtisan === 'complete' ? 'Artisan has completed Work!' : 'Artisan hasn\'t completed work yet'}</p>
                </div>
                <div className='mb-5'>
                    <p className='text-sm text-gray-500'>Artisan's Work Review</p>
                    <p>{bookingData.bookingStatusClient === 'complete' ? bookingData.bookingReview : 'Client yet to drop a review for Artisan'}</p>
                </div>


                <h1 className="mb-2 text-sm font-bold">Client Work Update</h1>
                <div className={bookingData.bookingStatusClient === 'complete' ? 'bg-green-100 text-green-600 px-4 rounded-[10px] mb-5' : 'bg-red-100 text-red-600 px-4 rounded-[10px] mb-5'}>
                    <p>{bookingData.bookingStatusClient === 'complete' ? 'Client has approved the work!' : 'Waiting for confirmation from client'}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-500'>In case the client is taking too long to verify the
                        work, contact client</p>
                </div>
            </div>

        </>
    );
}

export default ArtisanComplete;
