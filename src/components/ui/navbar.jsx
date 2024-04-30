// Navbar.js

import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-8 mr-4" />
                <span className="text-white text-lg font-semibold">Your Website</span>
            </div>

            {/* Nav Links */}
            <div className="flex-grow text-center">
                <a href="#top" className="text-white mr-4 hover:text-gray-300">Link 1</a>
                <a href="#top" className="text-white mr-4 hover:text-gray-300">Link 2</a>
                <a href="#top" className="text-white hover:text-gray-300">Link 3</a>
            </div>

            {/* Buttons */}
            <div>
                <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md">Button 1</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">Button 2</button>
            </div>
        </nav>
    );
}

export default Navbar;
