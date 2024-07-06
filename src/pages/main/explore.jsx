import React, { useState, useEffect } from 'react';
import Banner from '../../assets/images/exploreframe.png';
import BookNowButton from '../../components/common/BookNowButton';
import { fetchAllArtisanDataStatusTrue, fetchBusinessFieldsCategories } from '../../stores/actions';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
    const navigate = useNavigate();

    const [artisans, setArtisans] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const artisansData = await fetchAllArtisanDataStatusTrue();
                setArtisans(artisansData);
            } catch (error) {
                console.error('Error fetching artisans:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoriesData = await fetchBusinessFieldsCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchArtisans();
        fetchCategories();
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredArtisans = artisans.filter((artisan) => {
        const locationMatch = searchQuery && artisan.businessLocation.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = selectedCategory && artisan.businessField.toLowerCase() === selectedCategory.toLowerCase();
        const catMatch = searchQuery && artisan.businessField.toLowerCase().includes(searchQuery.toLowerCase());

        return (!searchQuery || locationMatch || catMatch) && (!selectedCategory || categoryMatch);
    });

    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 8;
    const totalPages = Math.ceil(filteredArtisans.length / servicesPerPage);
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredArtisans.slice(indexOfFirstService, indexOfLastService);

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    const handlePortfolio = (artisan) => {
        navigate('/portfolio', { state: { artisan } });
    }


    return (
        <div className="flex flex-col items-center justify-center py-20 px-2">
            <img className="w-full md:w-full" src={Banner} alt="banner" />

            <div className="flex flex-col md:flex-row justify-between items-center w-full">
                <div className="flex-shrink-0 mb-3 py-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for artisans..."
                        className="border border-gray-300 rounded-[10px] px-2 py-2 w-[250px] md:w-[400px] focus:outline-none"
                    />
                </div>

            </div>

            <h2 className="font-semibold mb-1 md:text-lg text-[15px]">Categories:</h2>

            <div className="rounded p-4 w-full flex flex-row md:items-center justify-center items-center backgroundImage">
                <div className="flex overflow-x-auto space-x-4">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-gray-300 px-2 py-1 rounded-[10px] cursor-pointer hover:bg-gray-200 text-xs md:text-base"
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-2 px-2">
                <div className="flex flex-wrap justify-center w-full">
                    {currentServices.map((artisan, index) => (
                        <div key={index} className="md:w-1/2 lg:w-1/4 p-2">
                            <div className="rounded-[10px] overflow-hidden shadow-violet-400 shadow-xl bg-white w-[350px] md:w-[300px] h-[400px]">
                                <div onClick={() => handlePortfolio(artisan)} className='w-[350px] md:w-[300px] h-[250px]'>
                                    <img className="w-full h-full object-cover" src={artisan.passportImage} alt="Person" />
                                </div>
                                <div className="p-4 w-[350px] md:w-[300px] h-[200px]">
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
                {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-center">
                        <button
                            className="bg-violet-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            &lt;&lt;
                        </button>
                        <button
                            className="bg-violet-300 text-white px-4 py-2 rounded mr-2"
                            onClick={prevPage}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
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
                        <button
                            className="bg-violet-300 text-white px-4 py-2 rounded mr-2"
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
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
