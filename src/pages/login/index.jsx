import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const LoginSelection = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center"
            p={3}
        >
            <Typography variant="h4" gutterBottom>Choose Your Login Type</Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigateTo('/login_client')}
                sx={{ mb: 3, width: '200px', padding: '15px' }}
            >
                Client Login
            </Button>
            <Button

                variant="contained"
                color="success"
                onClick={() => navigateTo('/login_artisan')}
                sx={{ mb: 3, width: '200px', padding: '15px' }}
            >
                Artisan Login
            </Button>
        </Box>
    );
};

export default LoginSelection;
