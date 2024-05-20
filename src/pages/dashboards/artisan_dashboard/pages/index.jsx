import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { fetchArtisanData, fetchAllArtisanAppointments, fetchLimitedArtisanAppointments, fetchClientData } from '../../../../stores/actions';
import { useAuth } from '../../../../contexts/authContext';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';


const containerStyle = {
  backgroundColor: 'white',
  padding: '16px',
  margin: '8px 0',
  borderRadius: '10px',
};

export default function ArtisanDashboardDefault() {
  const { userLoggedIn, currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [bookingLimitData, setBookingLimitData] = useState([]);
  const [clientNames, setClientNames] = useState({});

  useEffect(() => {
    const getArtisanData = async () => {
      if (userLoggedIn && currentUser?.uid) {
        const artisanData = await fetchArtisanData(currentUser.uid);
        setUserData(artisanData);
      }
    };

    const getArtisanAppointments = async () => {
      if (userLoggedIn && currentUser?.uid) {
        const bookingData = await fetchAllArtisanAppointments(currentUser.uid);
        setBookingData(bookingData);
      }
    }

    const getArtisanLimitedAppointments = async () => {
      if (userLoggedIn && currentUser?.uid) {
        const bookingLimitData = await fetchLimitedArtisanAppointments(3, currentUser.uid);
        setBookingLimitData(bookingLimitData);
      }
    }

    getArtisanData();
    getArtisanAppointments();
    getArtisanLimitedAppointments();
  }, [userLoggedIn, currentUser]);

  useEffect(() => {
    const fetchClientNames = async () => {
      const names = {};
      for (const booking of bookingLimitData) {
        if (!names[booking.bookingClientId]) {
          const clientData = await fetchClientData(booking.bookingClientId);
          names[booking.bookingClientId] = clientData.firstName;
        }
      }
      setClientNames(names);
    };

    fetchClientNames();
  }, [bookingLimitData]);

  const completedBookings = [];
  let totalRecieved = 0;
  const bookingsWithEstimate = [];
  const bookingsWithNoEstimate = [];

  bookingData.forEach((i) => {
    const data = i;

    if (data.bookingStatusClient === 'complete' && data.bookingStatusArtisan === 'complete') {
      completedBookings.push(data);
    }

    if (data.bookingPayment === 'complete' && data.bookingEstimateAmount !== '0') {
      totalRecieved += data.bookingEstimateAmount;
    }
  });

  bookingLimitData.forEach((i) => {
    if (i.bookingEstimateAmount !== 0) {
      bookingsWithEstimate.push(i);
    }
  });

  bookingLimitData.forEach((i) => {
    if (i.bookingEstimateAmount === 0 && i.bookingPayment !== 'complete' && i.bookingStatusArtisan !== 'complete' && i.bookingStatusClient !== 'complete') {
      bookingsWithNoEstimate.push(i);
    }
  });

  return (
    <div>
      <h1 className="font-bold text-2xl">Hi {userData ? userData.firstName : ''}!</h1>
      <Grid container className="flex flex-col md:flex-row">
        {/* Left Side */}
        <Grid item xs={12} md={8} className="p-2">
          <p className="text-sm text-gray-500">
            Welcome aboard to your hub for part-time opportunities! We're thrilled to have you join our community of hustlers, learners, and go-getters.
          </p>
          <Box className="flex flex-col h-full">
            {/* Top three black bordered divs */}
            <Box className="flex flex-col md:flex-row justify-between mb-2">
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Total Appointments</p>
                <p className="mb-2 font-bold">{bookingData.length}</p>
                <p className="text-sm text-gray-500">
                  <span className="text-blue-700">Approved</span> appointments
                </p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Completed Appointments</p>
                <p className="mb-2 font-bold">{completedBookings.length}</p>
                <p className="text-sm text-gray-500">
                  Audited and <span className="text-blue-700">paid</span> services
                </p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Total Profit</p>
                <p className="text-xl text-gray-500">
                  <span className="text-green-500">GHC {totalRecieved}.00</span>
                </p>
              </Box>
            </Box>
            {/* Large div taking the rest of the height */}
            <Box className="shadow-xl shadow-black-600 flex-1" sx={containerStyle}>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                  <Typography className='text-l font-bold' gutterBottom>
                    Pending Appointments
                  </Typography>
                  <p className='text-sm text-gray-500 mb-5'>
                    Approved appointments that you are supposed to complete at the due date
                  </p>
                </div>
                <div>
                  <p className='text-blue-600'><Link to={'/artisan_dashboard/appointments'}>See All</Link></p>
                </div>
              </div>
              {bookingsWithEstimate.length > 0 ? (
                bookingsWithEstimate.map((booking, index) => (
                  <Box key={index} className="p-2 rounded-[10px] border border-gray-300 mb-2">
                    <div className='flex justify-between mb-5'>
                      <div className='flex flex-row'>
                        <p className='font-bold'>{clientNames[booking.bookingClientId]}</p>
                      </div>
                      <div className='bg-red-300 rounded-[10px] px-4'>
                        <p className='text-red-700'>{booking.bookingEstimateAmount === 0 ? 'waiting for estimate' : ''
                          || booking.bookingPayment !== 'complete' ? 'waiting for payment' : ''
                            || booking.bookingStatusArtisan !== 'complete' ? 'waiting your completion' : ''
                              || booking.bookingStatusClient !== 'complete' ? 'waiting client completion' : ''
                        }</p>
                      </div>
                    </div>
                    <div className='flex flex-row justify-between text-left'>
                      <div>
                        <p className='text-gray-500'>Job Description</p>
                        <p className='font-bold text-sm'>{booking.bookingServiceDetail}</p>
                      </div>
                      <div>
                        <p className='text-gray-500'>Expected Date</p>
                        <p className='font-bold text-sm'>{booking.bookingStartDate}</p>
                      </div>
                      <div>
                        <p className='text-gray-500'>Total Estimate</p>
                        <p className='font-bold text-sm'>GHC {booking.bookingEstimateAmount}.00</p>
                      </div>
                      <div>
                        <p className='text-gray-500'>Location</p>
                        <p className='font-bold text-sm'>{booking.bookingTown} {booking.bookingRegion}</p>
                      </div>
                    </div>
                    <div>
                      <p className='text-gray-500 mt-2'>Expected Action</p>
                      <p className='font-bold text-sm'>
                        {booking.bookingEstimateAmount === 0 ? 'Client is waiting for estimate' : ''
                          || booking.bookingPayment !== 'complete' ? 'Client is expected to make full payment' : ''
                            || booking.bookingStatusArtisan !== 'complete' ? 'Confirm when the entire is completed to recieve full payment' : ''
                              || booking.bookingStatusClient !== 'complete' ? 'Waiting for client work complete confirmation' : ''
                        }
                      </p>
                    </div>
                  </Box>
                ))
              ) : (
                <Box className="flex flex-col items-center justify-center mt-10">
                  <EmptyIcon className='h-20' style={{ color: 'gray' }} />
                  <p className='font-bold text-lg'>You’ve no pending appointments yet</p>
                  <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no pending appointments for you. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4} className="flex flex-col p-2">
          <div className='flex flex-row justify-between'>
            <div>
              <Typography className='text-l font-bold' gutterBottom>
                Incoming Appointments
              </Typography>
            </div>
            <div>
              <p className='text-blue-600'><Link to={'/artisan_dashboard/appointments'}>See All</Link></p>
            </div>
          </div>

          <Typography variant="body1" className='text-gray-500' gutterBottom>
            Latest appointment listing from clients. Browse through and accept the ones that match your schedule          </Typography>
          {bookingsWithNoEstimate.length > 0 ? (
            bookingsWithNoEstimate.map((booking, index) => (
              <Box className="mb-2 shadow-xl shadow-black-600" sx={containerStyle}>
                <div className='flex flex-row mb-2'>
                  <p className='text-sm font-semibold'>{clientNames[booking.bookingClientId]}</p>
                </div>
                <div className='flex flex-col mb-2'>
                  <p className='text-gray-500'>Job Description</p>
                  <p className='font-bold text-sm'>{booking.bookingServiceDetail}</p>
                </div>
                <div className='flex flex-col mb-2'>
                  <p className='text-gray-500'>Estimated Date</p>
                  <p className='font-bold text-sm'>{booking.bookingStartDate}</p>
                </div>
                <div className='flex flex-col mb-2'>
                  <p className='text-gray-500'>Total Estimate</p>
                  <p className='font-bold text-sm'>GHC {booking.bookingEstimateAmount}.00</p>
                </div>
                <div className='bg-gray-300 w-auto text-center rounded p-2'>
                  <p className='text-red-600'>Waiting For Estimate</p>
                </div>
              </Box>
            ))
          ) : (
            <Box className="mb-2 shadow-xl flex flex-col items-center shadow-black-600" sx={containerStyle}>
              <EmptyIcon className='h-20' style={{ color: 'gray' }} />
              <p className='font-bold text-lg'>No new Appointments</p>
              <Typography className="text-gray-500 mt-2 text-center px-2">You're all set! There are currently no new appointments for you. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
