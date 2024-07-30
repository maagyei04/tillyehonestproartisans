import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { fetchArtisanData, fetchAllOrders } from '../../../../stores/actions';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';

export default function AdminShopOrdersTable() {
    const [ordersData, setOrdersData] = useState([]);
    const [clientDetails, setClientDetails] = useState({});
    const [artisanDetails, setArtisanDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllOrders = async () => {
            const ordersData = await fetchAllOrders();
            setOrdersData(ordersData);
            setLoading(false);
        };

        getAllOrders();
    }, []);

    useEffect(() => {

        const fetchArtisanDetails = async () => {
            const details = {};
            for (const orders of ordersData) {
                if (!details[orders.items.userId]) {
                    const artisanData = await fetchArtisanData(orders.items.userId);
                    details[orders.items.userId] = {
                        firstName: artisanData?.firstName || '',
                        lastName: artisanData?.lastName || '',
                    };
                }
            }
            setArtisanDetails(details);
        };

        if (ordersData.length > 0) {
            fetchArtisanDetails();
        }
    }, [ordersData]);

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
                        {ordersData.length > 0 ? (
                            ordersData.map((booking, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-gray-500 font-semibold'>
                                        {clientDetails[booking.bookingClientId]?.firstName ?? booking.bookingEmail} {clientDetails[booking.bookingClientId]?.lastName ?? ""}
                                    </TableCell>
                                    <TableCell className='text-gray-500'>{booking.paymentMethod}</TableCell>
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
