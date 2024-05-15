import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoToHomepage = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 className='text-xl font-bold'>OOPS, PAGE<span className='text-violet-700 italic'> NOT AVAILABLE!</span></h1>
                <p className='text-center'>Please click button below, to redirect to homepage...</p>
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
        backgroundColor: '#FFFFFF',
        margin: '30px 0px 0px 0px'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    animationContainer: {
        width: '300px',
        height: '300px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#6200ea',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default NotFound;
