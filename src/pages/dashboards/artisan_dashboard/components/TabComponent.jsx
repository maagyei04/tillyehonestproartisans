import React, { useState } from 'react';

const Tab = ({ label, isActive, onClick }) => (
    <button
        className={`pb-1 ${isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
        onClick={onClick}
    >
        {label}
    </button>
);

export default Tab;