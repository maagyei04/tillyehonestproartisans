import React, { useState } from 'react';
import {
    Grid,
    Box,
    Typography,
    Avatar,
    Divider,
    Tabs,
    Tab,
    Button
} from '@mui/material';
import { styled } from '@mui/system';
import Estimate from './estimate';

// Styled components
const LeftContainer = styled(Box)({
    backgroundColor: '#f9f9f9',
    padding: '8px',
    borderRight: '1px solid #ddd',
    height: 'auto',
});

const RightContainer = styled(Box)({
    padding: '5px',
    height: '100vh',
    overflowY: 'auto',
});

const appointments = [
    { name: 'George Asiedu', status: 'Pending', description: 'Kitchen Sink Leakage', date: '24th June, 2024', avatar: '../../' },
    { name: 'Agyei Michael', status: 'In Progress', description: 'Kitchen Sink Leakage', date: '24th June, 2024', avatar: 'path/to/avatar.png' },
    // More appointments here...
];

export default function Appointment() {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleClick = (appointment) => {
        setSelectedAppointment(appointment);
    }

    return (
        <Grid container>
            {/* Left side */}
            <Grid item xs={12} md={4}>
                <LeftContainer>
                    <Typography className="text-lg font-bold" gutterBottom>Active Appointments</Typography>
                    <input
                        className='bg-white rounded-[10px] shadow shadow-lg w-full p-1 mb-5'
                        placeholder='Search Appointments...'
                    />
                    <div>
                        {appointments.map((appointment, index) => (
                            <div
                                key={index}
                                button
                                onClick={() => handleClick(appointment)}
                                selected={selectedAppointment === appointment}
                                sx={{ mb: 2 }}
                            >
                                <div className={`${selectedAppointment === appointment ? 'border border-violet-600' : 'border border-gray-200'} flex flex-col mb-2 p-4 shadow shadow-lg rounded-[10px] bg-white`}>
                                    <div className='flex flex-row justify-between mb-5'>
                                        <div className='flex flex-row items-cente'>
                                            <Avatar className='h-5 w-5 mr-2' src={appointment.avatar} />
                                            <p className='text-sm'>{appointment.name}</p>
                                        </div>
                                        <div className={`${appointment.status === 'Pending' ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-green-500'} px-4 rounded-[10px]`}>
                                            {appointment.status}
                                        </div>
                                    </div>
                                    <div className='flex flex-row justify-between'>
                                        <div className='flex flex-col'>
                                            <p className='text-gray-500'>Job Description</p>
                                            {appointment.description}
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-gray-500'>Expected Date</p>
                                            {appointment.date}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </LeftContainer>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} md={8}>
                <RightContainer>
                    {selectedAppointment ? (
                        <>
                            <div className='flex flex-row items-center'>
                                <Typography className='text-sm font-bold mr-2' gutterBottom>Appointment Details</Typography>
                                <div className='bg-red-100 text-red-600 px-4 rounded-[10px]'>
                                    <p>Waiting for estimate</p>
                                </div>
                            </div>
                            <Tabs value={tabIndex} onChange={handleTabChange}>
                                <Tab label="General" />
                                <Tab label="Estimate" />
                                <Tab label="Payment" />
                                <Tab label="Completion" />
                            </Tabs>
                            <Box p={2}>
                                {tabIndex === 0 && (
                                    <>
                                        <div className='bg-white shadow shadow-lg p-5 rounded-[10px]'>
                                            <Typography variant="subtitle1" gutterBottom>Client Information</Typography>
                                            <div className='flex flex-row'>
                                                <div className='mr-2'>
                                                    <Avatar className='h-10 w-10 mr-2' src={selectedAppointment.avatar} />
                                                </div>
                                                <div>
                                                    <p className='text-sm'>{selectedAppointment.name}</p>
                                                    <p className='text-sm text-gray-500'>Accra</p>
                                                </div>
                                            </div>
                                            <Divider sx={{ my: 2 }} />


                                            <Typography variant="subtitle1" gutterBottom>Service Details</Typography>
                                            <Typography variant="body2">Problem Statement</Typography>
                                            <Typography variant="body1" color="textSecondary">
                                                {selectedAppointment.description}
                                            </Typography>
                                            <Divider sx={{ my: 2 }} />


                                            <Typography variant="subtitle1" gutterBottom>Date And Time</Typography>
                                            <div className='flex flex-row'>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>Estimated Date</p>
                                                    <p>24-06-24</p>
                                                </div>
                                                <div>
                                                    <p className='text-gray-500'>Time</p>
                                                    <p>8 am</p>
                                                </div>
                                            </div>
                                            <Divider sx={{ my: 2 }} />

                                            <Typography variant="subtitle1" gutterBottom>Work Location Information</Typography>
                                            <div className='flex flex-row mb-5'>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>Digital Address:</p>
                                                    <p>CP - 1254 - 4100</p>
                                                </div>
                                                <div>
                                                    <p className='text-gray-500'>House Number:</p>
                                                    <p>AK 124/B</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-row mb-5'>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>City/Town:</p>
                                                    <p>Pokuase</p>
                                                </div>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>Region:</p>
                                                    <p>Greater Accra</p>
                                                </div>
                                                <div>
                                                    <p className='text-gray-500'>Country:</p>
                                                    <p>Ghana</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-row mb-5'>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>Neighborhood / Community:</p>
                                                    <p>Ayaso</p>
                                                </div>
                                                <div>
                                                    <p className='text-gray-500'>Closest Landmark:</p>
                                                    <p>Shell Filling Station</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className='text-gray-500'>Extra Information about Location</p>
                                                <p>
                                                    Perched atop a gentle hillside, the house boasts panoramic views of the sprawling valley below. Surrounded by lush greenery and towering trees, it exudes a sense of tranquility and seclusion. A winding gravel path leads visitors through the verdant gardens, past a bubbling stream, and up to the welcoming front porch adorned with colorful blooms. As the sun sets in the west, casting a warm golden glow across the landscape, the house stands as a beacon of comfort and serenity in its picturesque setting
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {tabIndex === 1 && <Estimate />}
                                {tabIndex === 2 && <Typography>Payment Content</Typography>}
                                {tabIndex === 3 && <Typography>Completion Content</Typography>}
                            </Box>
                        </>
                    ) : (
                        <Typography variant="h6" color="textSecondary">Please select an appointment to view details.</Typography>
                    )}
                </RightContainer>
            </Grid>
        </Grid>
    );
}
