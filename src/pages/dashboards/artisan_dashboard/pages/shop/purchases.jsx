import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../contexts/authContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Pagination } from '@mui/material';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';
import { fetchAllOrdersByUserId } from '../../../../../stores/actions';


const rowsPerPage = 10;

const ShopPurhacesTable = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);

    const { currentUser, userLoggedIn } = useAuth();
    const userId = userLoggedIn && currentUser ? currentUser.uid : null;

    useEffect(() => {
        if (userId) {
            fetchAllOrdersByUserId(userId)
                .then(fetchedOrders => {
                    setOrders(fetchedOrders);
                    console.log(fetchedOrders);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
        }
    }, [userId]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const paginatedData = Array.isArray(orders) ? orders.slice((page - 1) * rowsPerPage, page * rowsPerPage) : [];

    return (
        <div className="">
            <div>
                <Typography variant="h2" gutterBottom className="font-bold text-xl">Recent Orders</Typography>

                <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                    <Table aria-label="responsive table">
                        <TableHead className='bg-gray-200'>
                            <TableRow>
                                <TableCell>Buyer Name</TableCell>
                                <TableCell>Buyer Phone</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Payment Status</TableCell>
                                <TableCell>Delivery Option</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='text-gray-500'>{row?.OrderBuyerName}</TableCell>
                                        <TableCell className='text-gray-500'>{row?.OrderBuyerPhoneNumber}</TableCell>
                                        <TableCell className='text-gray-500'>{row?.OrderDate}</TableCell>
                                        <TableCell className='text-gray-500'>{row?.OrderProductName}</TableCell>
                                        <TableCell className='text-gray-500'>{row?.OrderTotalPrice}</TableCell>
                                        <TableCell className='text-gray-500'>{row?.OrderQuantity}</TableCell>
                                        <TableCell className='text-gray-500'>{row?.OrderPaymentStatus}</TableCell>
                                        <TableCell className='text-gray-500'>{row?.OrderDeliveryOption}</TableCell>
                                        <TableCell>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="flex flex-col items-center justify-center mt-10">
                                            <EmptyIcon className='h-10' style={{ color: 'gray' }} />
                                            <p className='font-bold text-lg'>You've no financial history</p>
                                            <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no records of payment. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <div className="flex space-x-2">
                    <Pagination
                        count={Math.ceil(orders.length / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </div>
                <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                    onClick={() => setPage(page + 1)}
                    disabled={page === Math.ceil(orders.length / rowsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ShopPurhacesTable;