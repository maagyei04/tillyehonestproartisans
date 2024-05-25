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
            {bookingData.bookingStatusArtisan === 'complete' && bookingData.bookingStatusClient === 'complete' &&
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Appointment Completion</h1>
                    <div className='bg-green-100 text-green-600 px-4 rounded-[10px] mb-5'>
                        <p>Client has approved your work!</p>
                    </div>
                    <div>
                        <p className='mb-1 font-bold text-gray-500 text-sm'>Client Rating</p>
                        <p>{bookingData.bookingRate} stars</p>
                    </div>
                    <div>
                        <p className='mb-1 font-bold text-gray-500 text-sm'>Client Review</p>
                        <p>{bookingData.bookingReview}</p>
                    </div>
                </div>
            }

            {bookingData.bookingStatusArtisan === 'complete' && bookingData.bookingStatusClient === '' &&
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Appointment Completion</h1>
                    <div className='bg-red-100 text-red-600 px-4 rounded-[10px] mb-5'>
                        <p>Waiting for confirmation from client</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                A message will be sent to the client to confirm the completion of your appointment.
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Your client will rate you based on your
                                performance
                            </p>
                        </div>
                    </div>
                </div>
            }

            {bookingData.bookingStatusArtisan === '' &&
                <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                    <h1 className="mb-2 text-sm font-bold">Appointment Completion</h1>
                    <div className='bg-red-100 text-red-600 px-4 rounded-[10px] mb-5'>
                        <p>{bookingData.bookingStatusClient === 'complete' ? 'Client has marked the work as complete, waiting for your confirmation' : ''}</p>
                    </div>
                    <div className="flex flex-col mb-5">
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                Click on this button once you
                                complete the service for your client, remember to refresh the page after that
                            </p>
                        </div>
                        <div className="flex flex-row mb-5">
                            <CheckBadgeIcon className="w-5 mr-5" />
                            <p className="text-gray-500 text-sm">
                                You will receive full payments once
                                your client and you verifies work is done.
                            </p>
                        </div>

                    </div>
                    <button
                        className='w-full btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'
                        type="button"
                        onClick={handleClickOpen}
                    >
                        Service Completed
                    </button>
                </div>
            }

            {/* Modal */}
            <Dialog className='rounded-[20px]' open={open} onClose={handleClose}>
                <DialogTitle className='font-bold text-sm'>Are you sure you want to mark this service as completed?</DialogTitle>
                <DialogContent>
                    <Typography className='text-gray-500 text-sm'>
                        This is the final stage of the appointment.
                        Thank you for using our platform 🎊
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className='w-full btn bg-gray-300 hover:bg-gray-500 hover:text-white text-black md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} disabled={loading} className='w-full btn bg-violet-600 text-white hover:bg-green-600 hover:text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        {loading ? 'please waait...' : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ArtisanComplete;
