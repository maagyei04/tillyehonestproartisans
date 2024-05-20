import React, { useState } from 'react';
import { Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextareaAutosize } from '@mui/material';
import { updateBookingRate, updateBookingReview, updateBookingStatusClient } from '../../../../../stores/actions';

const Complete = ({ bookingData }) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (e) => {
        setOpen(false);

        setLoading(true);

        e.preventDefault();

        try {

            await updateBookingRate(bookingData.id, rating);

            await updateBookingReview(bookingData.id, review);

            await updateBookingStatusClient(bookingData.id, 'complete');

            alert('Booking has been marked as completed!');
        } catch (error) {
            console.error('Error marking booking as completed:', error);
            alert('Error marking booking as completed:');
        } finally {
            setLoading(false);
        }
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };


    return (
        <>
            <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                <h1 className="mb-2 text-sm font-bold">Appointment Completion</h1>
                <div className={bookingData.bookingStatusArtisan === '' ? 'bg-red-100 text-red-600 px-4 rounded-[10px] mb-5' : 'bg-green-100 text-green-600 px-4 rounded-[10px] mb-5'}>
                    <p>{bookingData.bookingStatusArtisan === '' ? "Artisan hasn't completed work yet" : "Artisan has completed work"}</p>
                </div>

                <div className="flex flex-col">
                    {bookingData.bookingStatusClient === '' ?
                        <div className="flex flex-col mb-5">
                            <p className='text-gray-500 text-sm mb-2'>Rate the Artisan</p>
                            <Select
                                value={rating}
                                onChange={handleRatingChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select Rating' }}
                                sx={{ minWidth: 120 }}
                            >
                                <MenuItem value="">
                                    <em>All Ratings</em>
                                </MenuItem>
                                <MenuItem value="5">5</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="1">1</MenuItem>
                            </Select>
                        </div>
                        :
                        <div className='mb-5 mt-5'>
                            <p className='text-sm font-bold text-500'>You Rated Artisan: <span className='text-green-600'>{bookingData.bookingRate} stars</span></p>
                        </div>
                    }
                    {bookingData.bookingStatusClient === '' ?
                        <div>
                            <div className="flex flex-col mb-5">
                                <p className='text-gray-500 text-sm mb-2'>Give a Review about the appointments or Artisan</p>
                                <div className='flex flex-col'>
                                    <TextareaAutosize
                                        className='border border-gray-300 rounded-[10px] p-2'
                                        id="review"
                                        name="review"
                                        placeholder='Leave a review here...'
                                        value={review}
                                        onChange={handleReviewChange}
                                        minRows={5}
                                        required
                                    />
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
                        :
                        <div className='mb-5 mt-5'>
                            <p className='text-sm font-bold text-500'>You Reviewed Artisan as:  <span className='text-green-600'>{bookingData.bookingReview}</span></p>
                        </div>
                    }
                </div>
            </div>

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

export default Complete;
