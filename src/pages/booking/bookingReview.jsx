

const rightSide = () => (
    <div className="text-center md:text-left md:w-2/4 mr-20 flex flex-col md:flex-row items-center">
        <h1>Booking Review Screen</h1>
    </div>
);

const LeftSide = () => (
    <div className='md:w-2/4 w-full'>
        <h1>Booking Review Screen</h1>
    </div>
);

const BookingReview = () => {
    return (
        <div className="flex flex-col items-center md:justify-center py-[90px] md:px-10">
            <div className="flex flex-col md:flex-row items-start md:justify-between">
                <LeftSide />
                <rightSide />
            </div>
        </div>
    );
};

export default BookingReview;
