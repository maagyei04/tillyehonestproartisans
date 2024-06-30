import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { useAuth } from '../../../../contexts/authContext';
import { fetchAllArtisanAppointments, fetchClientData } from '../../../../stores/actions';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';

export default function ArtisanFinancialHistory() {
    const { userLoggedIn, currentUser } = useAuth();
    const [bookingData, setBookingData] = useState([]);
    const [clientNames, setClientNames] = useState({});

    useEffect(() => {
        const getClientBookings = async () => {
            if (userLoggedIn && currentUser?.uid) {
                const bookingData = await fetchAllArtisanAppointments(currentUser.uid);
                setBookingData(bookingData);
            }
        }

        getClientBookings();
    }, [userLoggedIn, currentUser]);

    useEffect(() => {
        const fetchClientNames = async () => {
            const names = {};
            for (const booking of bookingData) {
                if (booking.bookingClientId && !names[booking.bookingClientId]) {
                    const clientData = await fetchClientData(booking.bookingClientId);
                    names[booking.bookingClientId] = clientData.firstName;
                }
            }
            setClientNames(names);
        };

        fetchClientNames();

    }, [bookingData]);

    return (
        <div className="">
            <Typography variant="h4" gutterBottom className="font-bold text-xl">History Of Recieved Payments</Typography>

            <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                <Table aria-label="responsive table">
                    <TableHead className='bg-gray-200'>
                        <TableRow>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Date Recieved</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingData.bookingPayment === 'complete' ? (
                            bookingData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-gray-500'>{clientNames[row?.bookingClientId] ?? row?.bookingEmail}</TableCell>
                                    <TableCell className='text-gray-500'>{row.bookingStartDate}</TableCell>
                                    <TableCell className='text-gray-500'>Mobile Money</TableCell>
                                    <TableCell className='text-gray-500'>GHC {row.bookingEstimateAmount}.00</TableCell>
                                    <TableCell>
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded"></button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex flex-col items-center justify-center mt-10">
                                        <EmptyIcon className='h-10' style={{ color: 'gray' }} />
                                        <p className='font-bold text-lg'>You’ve no financial history</p>
                                        <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no records of payment. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
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
