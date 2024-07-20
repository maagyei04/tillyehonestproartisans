import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import BookNowButton from '../../components/common/BookNowButton';
import { fetchAllArtisanPortfolio, fetchAllArtisanAppointments, fetchClientData } from '../../stores/actions';
import { Avatar } from '@mui/material';

const ArtisanPortfolio = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [userPortfolioData, setUserPortfolioData] = useState([]);
    const [bookingsDetails, setBookingsDetails] = useState([]);
    const [clientDetails, setClientDetails] = useState({});

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const location = useLocation();
    const { artisan } = location.state || {};

    useEffect(() => {
        const getArtisanPortfolio = async () => {
            if (artisan?.artisanId) {
                const portfolioData = await fetchAllArtisanPortfolio(artisan?.artisanId);
                setUserPortfolioData(portfolioData);
            } else {
                console.log('error');
            }
        };

        const getArtisanAppointments = async () => {
            if (artisan?.artisanId) {
                const bookingData = await fetchAllArtisanAppointments(artisan?.artisanId);
                setBookingsDetails(Array.isArray(bookingData) ? bookingData : []);
            }
        }

        getArtisanPortfolio();
        getArtisanAppointments();
    }, [artisan]);

    console.log(userPortfolioData);
    console.log(bookingsDetails);

    useEffect(() => {
        const fetchClientDetails = async () => {
            const details = {};
            for (const booking of bookingsDetails) {
                if (booking.bookingClientId && !details[booking.bookingClientId]) {
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

        if (Array.isArray(bookingsDetails)) {
            fetchClientDetails();
        }
    }, [bookingsDetails]);

    return (
        <div className="min-h-screen bg-gray-100 py-20">
            <header className="bg-white p-4 shadow-md">
                <div className="text-sm font-sm"><Link to={'/'}>Home</Link> / Portfolio</div>
                <div className="text-lg font-bold">Artisan's Portfolio</div>
            </header>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start p-5">
                <div className="rounded-[10px] overflow-hidden shadow-md bg-white w-[350px] md:w-[300px] h-[400px] mb-5 md:mb-0 md:mr-5">
                    <div>
                        <img src={artisan.passportImage} alt='profile pic' className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="bg-white rounded shadow-md flex-grow w-full md:w-full">
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        orientation="horizontal"
                        variant="scrollable"
                        className="border-b"
                    >
                        <Tab label="Overview" />
                        <Tab label="Works" />
                        <Tab label="Reviews" />
                    </Tabs>

                    <div className="fixed-width-container">
                        <TabPanel value={tabIndex} index={0}>
                            <Overview artisan={artisan} bookingsDetails={bookingsDetails} />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1}>
                            <MyWork portfolio={userPortfolioData} />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={2}>
                            <Reviews bookingsDetails={bookingsDetails} clientData={clientDetails} />
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabPanel = ({ children, value, index }) => {
    return (
        <div>
            {value === index && (
                <Box p={2}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
};

const Overview = ({ artisan, bookingsDetails }) => (
    <div>
        <h2 className="text-xl font-semibold">{artisan.firstName} {artisan.lastName}</h2>
        <div className="text-yellow-500">
            <span className="font-bold">{bookingsDetails?.bookingRate}</span>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < Math.floor(bookingsDetails?.bookingRate ? bookingsDetails?.bookingRate : 0) ? '★' : '☆'}</span>
            ))}
        </div>
        <div className="mt-2">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">{artisan.businessField} / {artisan?.businessFieldSecondary}</span>
            <span className="ml-2">{artisan.businessLocation}</span>
        </div>
        <p className="mt-4 mb-5">{artisan.bio ? artisan.bio : 'I have excellent customer service skills and work prudently to bring my work to completion. I offer excellent value for low cost.'}</p>
        <BookNowButton artisan={artisan} />
    </div>
);

const MyWork = ({ portfolio }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {portfolio && portfolio.length > 0 ? (
            portfolio.map((work, index) => (
                <WorkItem
                    key={index}
                    title={work.title ? work.title : 'No Title'}
                    date={work.date}
                    imageUrl={work?.image_url}
                />
            ))
        ) : (
            <div className="flex text-center justify-center items-center text-gray-600 bg-gray-300 shadow-lg rounded-lg w-auto md:w-auto h-[200px]">
                This artisan is yet to upload their portfolios.
            </div>
        )}
    </div>
);

const WorkItem = ({ title, date, imageUrl }) => (
    <div className="shadow-lg rounded-lg overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="py-2 px-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <span className="text-gray-500 text-sm">{date}</span>
            </div>
        </div>
    </div>
);

const Reviews = ({ bookingsDetails, clientData }) => (
    <div>
        {Array.isArray(bookingsDetails) && bookingsDetails.length > 0 && bookingsDetails.every(booking => booking.bookingReview !== '' || booking.bookingRate !== '') ? (
            bookingsDetails.map((booking, index) => (
                <ReviewItem
                    key={index}
                    firstName={clientData[booking.bookingClientId]?.firstName ?? booking.bookingEmail}
                    lastName={clientData[booking.bookingClientId]?.lastName ?? ''}
                    pic={clientData[booking.bookingClientId]?.profilePic ?? ''}
                    review={booking.bookingReview}
                    rating={booking.bookingRate}
                    date={'...moments ago'}
                />
            ))
        ) : (
            <div className="flex text-center justify-center items-center text-gray-600 bg-gray-300 shadow-lg rounded-lg w-auto md:w-auto h-[200px]">
                This artisan doesn't have any reviews yet.
            </div>
        )}

    </div>
);

const ReviewItem = ({ firstName, lastName, pic, rating, date, review }) => (
    <div className="flex flex-col mb-4">
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-5">
                    {pic && <Avatar src={pic} alt='client pic' />}
                </div>
                <div>
                    <div className="font-semibold">{firstName} {lastName}</div>
                    <div className="text-yellow-500 text-sm">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
                        ))}
                        <span className="ml-1">({rating} Rating)</span>
                    </div>
                </div>
            </div>
            <div className="text-gray-500 text-sm">{date}</div>
        </div>
        <div className="mt-2">
            <p>{review}</p>
        </div>
    </div>
);

export default ArtisanPortfolio;
