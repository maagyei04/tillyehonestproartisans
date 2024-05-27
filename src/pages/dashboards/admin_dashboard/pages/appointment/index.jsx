import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Typography,
    Avatar,
    Divider,
    Tabs,
    Tab,
} from '@mui/material';
import { styled } from '@mui/system';
import Estimate from './estimate';
import Payment from './payment';
import Complete from './complete';
import { fetchArtisanData, fetchClientData, fetchAllBookings } from '../../../../../stores/actions';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';


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

export default function ArtisanAppointment() {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [allBookings, setAllBookings] = useState([])
    const [clientDetails, setClientDetails] = useState({});
    const [artisanDetails, setArtisanDetails] = useState({});


    useEffect(() => {

        const getAllBookings = async () => {
            const allBookigs = await fetchAllBookings();
            setAllBookings(allBookigs);
            console.log(allBookigs);
        }

        getAllBookings();
    }, []);


    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleClick = (appointment) => {
        setSelectedAppointment(appointment);
    }

    useEffect(() => {
        const fetchClientDetails = async () => {
            const details = {};
            for (const booking of allBookings) {
                if (!details[booking.bookingClientId]) {
                    const clientData = await fetchClientData(booking.bookingClientId);
                    details[booking.bookingClientId] = {
                        firstName: clientData.firstName,
                        lastName: clientData.lastName,
                        profilePic: clientData.profilePic,
                        email: clientData.email,
                        phoneNumber: clientData.phoneNumber,
                    };
                }
            }
            setClientDetails(details);
        };

        const fetchArtisanDetails = async () => {
            const details = {};
            for (const booking of allBookings) {
                if (!details[booking.bookingArtisanId]) {
                    const artisanData = await fetchArtisanData(booking.bookingArtisanId);
                    details[booking.bookingArtisanId] = {
                        firstName: artisanData.firstName,
                        lastName: artisanData.lastName,
                        passportImage: artisanData.passportImage,
                        email: artisanData.email,
                        phoneNumber: artisanData.phoneNumber,
                    };
                }
            }
            setArtisanDetails(details);
        };

        fetchClientDetails();
        fetchArtisanDetails();
    }, [allBookings]);

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
                        {allBookings.length > 0 ? (
                            allBookings.map((booking, index) => (
                                <div
                                    key={index}
                                    button
                                    onClick={() => handleClick(booking)}
                                    selected={selectedAppointment === booking}
                                    sx={{ mb: 2 }}
                                >
                                    <div className={`${selectedAppointment === booking ? 'border border-violet-600' : 'border border-gray-200'} flex flex-col mb-2 p-4 shadow shadow-lg rounded-[10px] bg-white`}>
                                        {clientDetails[booking.bookingClientId] ? (
                                            <div className='flex flex-row justify-between mb-5'>
                                                <div className='flex flex-row items-cente'>
                                                    <Avatar src={clientDetails[booking.bookingClientId].profilePic} className='h-5 w-5 mr-2' />
                                                    <p className='text-sm'>{clientDetails[booking.bookingClientId].firstName} {clientDetails[booking.bookingClientId].lastName}</p>
                                                </div>
                                                <div className={`${booking.bookingEstimateAmount === 0 ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-green-500'} px-4 rounded-[10px]`}>
                                                    {booking.bookingEstimateAmount === 0 ? 'Pending' : 'Estimate Done'}
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Loading client details...</p>
                                        )}
                                        <div className='flex flex-row justify-between'>
                                            <div className='flex flex-col truncate w-2/4'>
                                                <p className='text-gray-500'>Job Description</p>
                                                <p className=''>{booking.bookingServiceDetail}</p>
                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='text-gray-500'>Expected Date</p>
                                                {booking.bookingStartDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Box className="flex flex-col items-center justify-center mt-10">
                                <EmptyIcon className='h-20' style={{ color: 'gray' }} />
                                <p className='font-bold text-lg'>You’ve not been booked yet</p>
                                <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no booked appointments for you. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
                            </Box>
                        )}
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
                                    <p>{selectedAppointment.bookingEstimateAmount === 0 ? 'Waiting for estimate' : 'Estimate Done'}</p>
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
                                                    <Avatar className='h-10 w-10 mr-2' src={clientDetails[selectedAppointment.bookingClientId].profilePic} />
                                                </div>
                                                <div>
                                                    <p className='text-sm'>{clientDetails[selectedAppointment.bookingClientId].firstName} {clientDetails[selectedAppointment.bookingClientId].lastName}</p>
                                                    <p className='text-sm text-gray-500'>{clientDetails[selectedAppointment.bookingClientId].phoneNumber}</p>
                                                </div>
                                            </div>
                                            <Divider sx={{ my: 2 }} />

                                            <div className='flex flex-col mb-2'>
                                                <p className='text-gray-500'>Artisan</p>
                                            </div>
                                            {artisanDetails[selectedAppointment.bookingArtisanId] ? (
                                                <div className='flex flex-row mb-3'>
                                                    <Avatar className='h-10 w-10' src={artisanDetails[selectedAppointment.bookingArtisanId].passportImage} />
                                                    <div className='flex flex-col mb-2 ml-2'>
                                                        <p className='text-sm font-semibold'>{artisanDetails[selectedAppointment.bookingArtisanId].firstName} {artisanDetails[selectedAppointment.bookingArtisanId].lastName}</p>
                                                        <p className='text-sm text-gray-500'>{artisanDetails[selectedAppointment.bookingArtisanId].email}</p>
                                                        <p className='text-sm text-gray-500'>{artisanDetails[selectedAppointment.bookingArtisanId].phoneNumber}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>Loading artisan details...</p>
                                            )}

                                            <Typography variant="subtitle1" gutterBottom>Service Details</Typography>
                                            <Typography variant="body2">Problem Statement</Typography>
                                            <span className='text-sm text-gray-500'>
                                                <textarea contentEditable="false" value={selectedAppointment.bookingServiceDetail} rows={4} className='w-full'>
                                                </textarea>
                                            </span>
                                            <Divider sx={{ my: 2 }} />


                                            <Typography variant="subtitle1" gutterBottom>Date And Time</Typography>
                                            <div className='flex flex-row'>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>Estimated Date</p>
                                                    <p>{selectedAppointment.bookingStartDate}</p>
                                                </div>
                                                <div>
                                                    <p className='text-gray-500'>Time</p>
                                                    <p>{selectedAppointment.bookingStartTime}</p>
                                                </div>
                                            </div>
                                            <Divider sx={{ my: 2 }} />

                                            <Typography variant="subtitle1" gutterBottom>Work Location Information</Typography>
                                            <div className='flex flex-row mb-5'>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>Digital Address:</p>
                                                    <p>{selectedAppointment.bookingDigitalAddress}</p>
                                                </div>
                                                <div>
                                                    <p className='text-gray-500'>House Number:</p>
                                                    <p>{selectedAppointment.bookingHouseNumber}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-row mb-5'>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>City/Town:</p>
                                                    <p>{selectedAppointment.bookingTown}</p>
                                                </div>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>Region:</p>
                                                    <p>{selectedAppointment.bookingRegion}</p>
                                                </div>
                                                <div>
                                                    <p className='text-gray-500'>Country:</p>
                                                    <p>{selectedAppointment.bookingCountry}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-row mb-5'>
                                                <div className='mr-10'>
                                                    <p className='text-gray-500'>Neighborhood / Community:</p>
                                                    <p>{selectedAppointment.bookingCommunity}</p>
                                                </div>
                                                <div>
                                                    <p className='text-gray-500'>Closest Landmark:</p>
                                                    <p>{selectedAppointment.bookingLandmark}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className='text-gray-500'>Extra Information about Location</p>
                                                <span className='text-sm'>
                                                    <textarea contentEditable="false" value={selectedAppointment.bookingLocationInfo} rows={4} className='w-full'>
                                                    </textarea>
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {tabIndex === 1 && <Estimate bookingData={selectedAppointment} />}
                                {tabIndex === 2 && <Payment bookingData={selectedAppointment} />}
                                {tabIndex === 3 && <Complete bookingData={selectedAppointment} />}
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
