import React, { useState, useEffect } from 'react';
import Banner from '../../assets/images/exploreframe.png';
import BookNowButton from '../../components/common/BookNowButton';
import { fetchAllArtisanDataStatusTrue } from '../../stores/actions';

const Explore = () => {

    const [artisans, setArtisans] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const artisansData = await fetchAllArtisanDataStatusTrue();
                setArtisans(artisansData);
            } catch (error) {

                console.error('Error fetching artisans:', error);
            }
        };

        fetchArtisans();
    }, []);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredArtisans = artisans.filter((artisan) => {
        const nameMatch = searchQuery && artisan.firstName.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = selectedCategory && artisan.businessField.toLowerCase() === selectedCategory.toLowerCase();
        // Check if both conditions match
        return (!searchQuery || nameMatch) && (!selectedCategory || categoryMatch);
    });


    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 8;
    const totalPages = Math.ceil(artisans.length / servicesPerPage);
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = artisans.slice(indexOfFirstService, indexOfLastService);

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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for artisans..."
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


            {/* Categories Container */}
            <div className="rounded p-4 w-full flex md:flex-col flex-row md:items-center items-start backgroundImage"> {/* Centered content in Categories Container */}
                <h2 className="font-semibold mb-3 md:text-lg text-[15px]">
                    Popular:
                </h2>
                <ul className="flex flex-wrap md:justify-center justify-start ml-5"> {/* Centered tags horizontally */}
                    <li className="bg-gray-300 px-2 py-1 mr-2 mb-2 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base" onClick={() => handleCategorySelect('plumbing')}>Plumbering</li>
                    <li className="bg-gray-300 px-2 py-1 mr-2 mb-2 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base" onClick={() => handleCategorySelect('Electrical Engineering')}>Electrical Engineering</li>
                    <li className="bg-gray-300 px-2 py-1 mr-2 mb-2 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base" onClick={() => handleCategorySelect('Construction')}>Construction</li>
                </ul>
            </div>

            {/* Explore Content */}
            <div className="flex flex-col items-center justify-center py-2 px-2">
                <div className="flex flex-wrap justify-center w-full">
                    {/* Display services data */}
                    {filteredArtisans.map((artisan, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-2">
                            <div className="rounded-[10px] overflow-hidden shadow-violet-500 shadow-xl bg-white w-[300px] h-[400px]">
                                <div className='w-[300px] h-[250px]'>
                                    <img className="w-full h-full object-cover" src={artisan.passportImage} alt="Person" />
                                </div>
                                <div className="p-4 w-[300px] h-[200px]">
                                    <h2 className="font-semibold text-lg mb-2">{artisan.firstName}</h2>
                                    <div className="flex justify-between mb-2">
                                        <p className="text-sm text-gray-700 font-semibold">{artisan.businessField}</p>
                                        <p className="text-sm">{artisan.businessLocation}</p>
                                    </div>
                                    <BookNowButton artisan={artisan} />
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
