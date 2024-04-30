import React, { useState } from 'react';
import Banner from '../assets/images/exploreframe.png';
import Person from '../assets/images/carpentry.png';

const Explore = () => {

    const servicesData = [
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
        { name: 'John Doe', category: 'Plumbing', charge: 'GHc 50' },
    ];

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 8;
    const totalPages = Math.ceil(servicesData.length / servicesPerPage);
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = servicesData.slice(indexOfFirstService, indexOfLastService);

    // Pagination handlers
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    return (
        <div className="flex flex-col items-center justify-center py-20 px-2">
            {/* Banner */}
            <img className="w-full md:w-full" src={Banner} alt="banner" />

            <div className="flex flex-col md:flex-row justify-between items-center w-full">
                {/* Search Bar */}
                <div className="flex-shrink-0 mb-3 py-2">
                    <input
                        type="text"
                        placeholder="Search For Any Service..."
                        className="border border-gray-300 rounded-[10px] px-2 py-2 w-[250px] md:w-[400px] focus:outline-none"
                    />
                    <button className="bg-green-500 rounded-[10px] text-white px-4 py-2 ml-2 hover:bg-violet-600 focus:outline-none">Search</button>
                </div>

                {/* Dropdowns */}
                <div className="flex flex-row md:flex-row items-center">
                    {/* Dropdown 1 */}
                    <select className="mr-2 mb-2 md:mb-0 border border-gray-300 rounded px-2 py-1">
                        {/* Dropdown options */}
                        <option>5 star rating</option>
                    </select>

                    {/* Dropdown 2 */}
                    <select className="mr-2 mb-2 md:mb-0 border border-gray-300 rounded px-2 py-1">
                        {/* Dropdown options */}
                        <option>All Fields</option>
                    </select>

                    {/* Dropdown 3 */}
                    <select className="border border-gray-300 rounded px-2 py-1">
                        {/* Dropdown options */}
                        <option>Near You</option>
                    </select>
                </div>
            </div>


            {/* Popular Container */}
            <div className="rounded p-4 w-full flex flex-col items-left backgroundImage"> {/* Centered content in Categories Container */}
                <div className="flex items-center mb-3"> {/* Centered tags horizontally */}
                    <h2 className="font-semibold md:text-lg text-[15px] mr-2">Popular:</h2>
                    <ul className="flex flex-wrap justify-center"> {/* Centered tags horizontally */}
                        <li className="bg-gray-300 px-2 py-1 mr-2 mb-2 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base">Plumbering</li> {/* Adjusted size for mobile */}
                        <li className="bg-gray-300 px-2 py-1 mr-2 mb-2 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base">Electrical Engineering</li> {/* Adjusted size for mobile */}
                        <li className="bg-gray-300 px-2 py-1 mr-2 mb-2 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base">Building And Construction</li> {/* Adjusted size for mobile */}
                    </ul>
                </div>
            </div>

            {/* Explore Content */}
            <div className="flex flex-col items-center justify-center py-2 px-2">
                <div className="flex flex-wrap justify-center">
                    {/* Display services data */}
                    {currentServices.map((service, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-2">
                            <div className="rounded overflow-hidden shadow-lg bg-white">
                                <img className="w-full h-auto" src={Person} alt="Person" />
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg mb-2">{service.name}</h2>
                                    <div className="flex justify-between mb-2">
                                        <p className="text-sm text-gray-700 font-semibold">{service.category}</p>
                                        <p className="text-sm">{service.charge}</p>
                                    </div>
                                    <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-violet-600">Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-center">
                        {/* First page arrow */}
                        <button
                            className="bg-violet-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            &lt;&lt;
                        </button>
                        {/* Previous page arrow */}
                        <button
                            className="bg-violet-300 text-white px-4 py-2 rounded mr-2"
                            onClick={prevPage}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {/* Numbered pages */}
                        {Array.from({ length: totalPages > 3 ? 3 : totalPages }, (_, i) => {
                            const page = totalPages > 3 ? i + (currentPage > 2 ? currentPage - 1 : 1) : i + 1;
                            return (
                                <button
                                    key={page}
                                    className={`bg-green-500 text-white px-4 py-2 rounded mr-2 ${currentPage === page ? 'bg-green-700' : ''}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        {/* Next page arrow */}
                        <button
                            className="bg-violet-300 text-white px-4 py-2 rounded mr-2"
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                        {/* Last page arrow */}
                        <button
                            className="bg-violet-500 text-white px-4 py-2 rounded"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            &gt;&gt;
                        </button>
                    </div>
                )}

            </div>


        </div>
    );
};

export default Explore;
