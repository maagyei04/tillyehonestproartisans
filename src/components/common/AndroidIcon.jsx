import React from 'react';
import { CustomIconComponent } from '@heroicons/react/24/solid';

const AndroidIcon = (props) => (
    <CustomIconComponent {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Replace the following path with the path to your SVG representation of the Android logo */}
            <path d="M14.5 5.5a2 2 0 10-4 0V7m0 0a2 2 0 004 0v10m0 0a2 2 0 11-4 0v-1.5m0 0a2 2 0 004 0v-1m-7 1a1 1 0 10-2 0V11m0 0a1 1 0 002 0v1m0 0a1 1 0 11-2 0V9m0 0a1 1 0 002 0v.5m3 7a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zM6 17a1 1 0 100-2 1 1 0 000 2zm0-7a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
    </CustomIconComponent>
);

export default AndroidIcon;
