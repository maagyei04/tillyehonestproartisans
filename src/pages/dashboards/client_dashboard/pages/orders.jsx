import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const data = [
    { name: 'John Doe', dateStarted: '2024-01-01', dateCompleted: '2024-01-15', location: 'New York', amount: 'GHC 200', service: 'Plumbing' },
    { name: 'Jane Smith', dateStarted: '2024-02-10', dateCompleted: '2024-02-20', location: 'Los Angeles', amount: 'GHC 350', service: 'Electrician' },
    // Add more rows as needed
];

export default function OrdersTable() {
    return (
        <div className="">
            <Typography variant="h4" gutterBottom className="font-bold text-xl">History Of Completed Appointments</Typography>
            <Typography variant="body1" gutterBottom>
                Welcome to your Orders Page. Here you can see the latest updates and insights on all artisan bookings.
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: 4, overflowX: 'auto' }}>
                <Table aria-label="responsive table">
                    <TableHead className='bg-gray-200'>
                        <TableRow>
                            <TableCell>Artisan Name</TableCell>
                            <TableCell>Date Started</TableCell>
                            <TableCell>Date Completed</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Service</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-gray-500'>{row.name}</TableCell>
                                <TableCell className='text-gray-500'>{row.dateStarted}</TableCell>
                                <TableCell className='text-gray-500'>{row.dateCompleted}</TableCell>
                                <TableCell className='text-gray-500'>{row.location}</TableCell>
                                <TableCell className='text-green-500'>{row.amount}</TableCell>
                                <TableCell className='text-gray-500'>{row.service}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
