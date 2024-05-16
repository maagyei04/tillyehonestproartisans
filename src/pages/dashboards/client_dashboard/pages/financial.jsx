import React, { useState } from 'react';
import { Grid, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const data = [
    { name: 'John Doe', dateSent: '2024-01-01', amount: 'GHC 200', paymentMethod: 'Mobile Money', action: 'View' },
    { name: 'Jane Smith', dateSent: '2024-02-10', amount: ' GHC 350', paymentMethod: 'Mobile Money', action: 'View' },
    // Add more rows as needed
];

export default function FinancialHistory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const filteredData = data.filter((row) => {
        return (
            (row.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedYear === '' || row.dateSent.includes(selectedYear))
        );
    });

    return (
        <div className="">
            <Box className="flex flex-row justify-between" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ marginRight: 2 }}
                />
                <Select
                    value={selectedYear}
                    onChange={handleYearChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select Year' }}
                    sx={{ minWidth: 120 }}
                >
                    <MenuItem value="">
                        <em>All Years</em>
                    </MenuItem>
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                    {/* Add more years as needed */}
                </Select>
            </Box>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table aria-label="responsive table">
                    <TableHead className='bg-gray-200'>
                        <TableRow>
                            <TableCell>Artisan Name</TableCell>
                            <TableCell>Date Sent</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-gray-500'>{row.name}</TableCell>
                                <TableCell className='text-gray-500'>{row.dateSent}</TableCell>
                                <TableCell className='text-green-500'>{row.amount}</TableCell>
                                <TableCell className='text-gray-500'>{row.paymentMethod}</TableCell>
                                <TableCell>
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded">{row.action}</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
