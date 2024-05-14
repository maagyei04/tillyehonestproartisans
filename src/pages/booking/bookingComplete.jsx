import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiveAnimation } from '../../components/common/RiveAnimation';
import rive from '../../assets/rives/loading_loop.riv';

const BookingComplete = () => {
    const navigate = useNavigate();

    const handleGoToHomepage = () => {
        navigate('/tillyehonestproartisans/');
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 className='text-xl font-bold'>CONGRATS, BOOKING <span className='text-violet-700 italic'>COMPLETE!</span></h1>
                <p className='text-center'>You'll hear from us soon, either via Email or Text....<br></br>Thank You</p>
                <div style={styles.animationContainer}>
                    <RiveAnimation rivelink={rive} />
                </div>
                <button style={styles.button} onClick={handleGoToHomepage}>
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#FFFFFF', // Optional: Customize your background color
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    animationContainer: {
        width: '300px', // Adjust the size as needed
        height: '300px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#6200ea', // Optional: Customize your button color
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default BookingComplete;
