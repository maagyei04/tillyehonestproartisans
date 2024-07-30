import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { fetchArtisanData, fetchAllOrders } from '../../../../stores/actions';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';
import { Timestamp } from '@firebase/firestore';


export default function AdminShopOrdersTable() {
    const [ordersData, setOrdersData] = useState([]);
    const [artisanDetails, setArtisanDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const formatDate = (timestamp) => {
        if (timestamp === undefined) {
            return ''; // or any other default value you prefer
        }

        if (timestamp instanceof Timestamp) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString();
        } else {
            return timestamp.toDate().toLocaleDateString();
        }
    };

    useEffect(() => {
        const getAllOrders = async () => {
            const ordersData = await fetchAllOrders();
            setOrdersData(ordersData);
            setLoading(false);
        };

        getAllOrders();
    }, []);

    useEffect(() => {
        console.log(ordersData);

        const fetchArtisanDetails = async () => {
            const details = {};
            for (const order of ordersData) {
                if (Array.isArray(order?.items)) {
                    for (const item of order.items) {
                        const userId = item?.userId;
                        console.log(userId);
                        if (userId && !details[userId]) {
                            const artisanData = await fetchArtisanData(userId);
                            details[userId] = {
                                firstName: artisanData?.firstName || '',
                                lastName: artisanData?.lastName || '',
                            };
                        }
                    }
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
            <Typography variant="h4" gutterBottom className="font-bold text-xl">History Of Shop Orders</Typography>

            <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                <Table aria-label="responsive table">
                    <TableHead className='bg-gray-200'>
                        <TableRow>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Client Number</TableCell>
                            <TableCell>Date Ordered</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Seller Name(s)</TableCell>
                            <TableCell>Product(s)</TableCell>
                            <TableCell>Total Quantity</TableCell>
                            <TableCell>Payment Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordersData.length > 0 ? (
                            ordersData.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-gray-500 font-semibold'>{order?.buyerName}</TableCell>
                                    <TableCell className='text-gray-500'>{order?.buyerPhone}</TableCell>
                                    <TableCell className='text-gray-500'>{formatDate(order?.dateOrdered)}</TableCell>
                                    <TableCell className='text-gray-500'>{order?.buyerLocation}</TableCell>
                                    <TableCell className='text-gray-500'>GHC {order.totalAmount}.00</TableCell>
                                    <TableCell className="text-gray-500">
                                        {Array.isArray(order?.items) ? (
                                            order.items.map((item, itemIndex) => (
                                                <div key={itemIndex}>
                                                    {artisanDetails[item?.userId]?.firstName} {artisanDetails[item?.userId]?.lastName}
                                                </div>
                                            ))
                                        ) : (
                                            'No Seller'
                                        )}
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {Array.isArray(order?.items) ? (
                                            order.items.map((item, itemIndex) => (
                                                <div key={itemIndex}>
                                                    {item.productName}
                                                </div>
                                            ))
                                        ) : (
                                            'No items'
                                        )}
                                    </TableCell>
                                    <TableCell className='text-gray-500'>{order?.totalQuantity}</TableCell>
                                    <TableCell className="text-gray-500">{order?.paymentStatus}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex flex-col items-center justify-center mt-10">
                                        <EmptyIcon className='h-10' style={{ color: 'gray' }} />
                                        <p className='font-bold text-lg'>No pending orders from shop yet</p>
                                        <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no orders from the shop yet. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};