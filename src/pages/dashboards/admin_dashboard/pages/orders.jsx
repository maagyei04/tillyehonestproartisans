import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { fetchClientData, fetchArtisanData, fetchAllBookings } from '../../../../stores/actions';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';

export default function AdminOrdersTable() {
    const [bookingData, setBookingData] = useState([]);
    const [clientDetails, setClientDetails] = useState({});
    const [artisanDetails, setArtisanDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllBookings = async () => {
            const bookingData = await fetchAllBookings();
            setBookingData(bookingData);
            setLoading(false);
        };

        getAllBookings();
    }, []);

    useEffect(() => {
        const fetchClientDetails = async () => {
            const details = {};
            for (const booking of bookingData) {
                if (booking.bookingClientId && !details[booking.bookingClientId]) {
                    const clientData = await fetchClientData(booking.bookingClientId);
                    details[booking.bookingClientId] = {
                        firstName: clientData?.firstName || '',
                        lastName: clientData?.lastName || '',
                    };
                }
            }
            setClientDetails(details);
        };

        const fetchArtisanDetails = async () => {
            const details = {};
            for (const booking of bookingData) {
                if (booking.bookingArtisanId && !details[booking.bookingArtisanId]) {
                    const artisanData = await fetchArtisanData(booking.bookingArtisanId);
                    details[booking.bookingArtisanId] = {
                        firstName: artisanData?.firstName || '',
                        lastName: artisanData?.lastName || '',
                    };
                }
            }
            setArtisanDetails(details);
        };

        if (bookingData.length > 0) {
            fetchClientDetails();
            fetchArtisanDetails();
        }
    }, [bookingData]);

    return (
        <div>
            <Typography variant="h4" gutterBottom className="font-bold text-xl">History Of Completed Appointments</Typography>

            <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                <Table aria-label="responsive table">
                    <TableHead className='bg-gray-200'>
                        <TableRow>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Date Started</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Estimated Amount</TableCell>
                            <TableCell>Artisan Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingData.length > 0 ? (
                            bookingData.map((booking, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-gray-500 font-semibold'>
                                        {clientDetails[booking.bookingClientId]?.firstName ?? booking.bookingEmail} {clientDetails[booking.bookingClientId]?.lastName ?? ""}
                                    </TableCell>
                                    <TableCell className='text-gray-500'>{booking.bookingStartDate}</TableCell>
                                    <TableCell className='text-gray-500'>{booking.bookingTown}</TableCell>
                                    <TableCell className='text-gray-500'>GHC {booking.bookingEstimateAmount}.00</TableCell>
                                    <TableCell className='font-semibold text-gray-500'>
                                        {artisanDetails[booking.bookingArtisanId]?.firstName} {artisanDetails[booking.bookingArtisanId]?.lastName}
                                    </TableCell>
                                    <TableCell>
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded"></button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex flex-col items-center justify-center mt-10">
                                        <EmptyIcon className='h-10' style={{ color: 'gray' }} />
                                        <p className='font-bold text-lg'>You’ve no pending orders</p>
                                        <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no pending orders for you. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
