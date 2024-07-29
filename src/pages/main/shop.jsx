import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../stores/actions';
import { useNavigate } from 'react-router-dom';


const Shop = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await fetchAllProducts();
                setProducts(productsData);
                setFilteredProducts(productsData); // Initialize filtered products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(query) ||
            product.productLocation.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    const groupedProducts = filteredProducts.reduce((acc, product) => {
        const { category } = product;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    const handlePortfolio = (product) => {
        navigate('/shop_info', { state: { product } });
    }

    return (
        <div className="shop">
            <div className='py-[100px]'>
                <div className="flex flex-col md:flex-row justify-center items-center w-full">
                    <div className="flex-shrink-0 mb-3 py-2">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-[10px] px-8 py-2 w-[250px] md:w-[800px] focus:outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-[10px]"
                        >
                            Search
                        </button>
                    </div>
                </div>
                {Object.keys(groupedProducts).map((category, index) => (
                    <div key={index} className="category font-bold">
                        <h2>{category}</h2>
                        <div className="items">
                            {groupedProducts[category].map((item, idx) => (
                                <div key={idx} className="item shadow-xl truncate" onClick={() => handlePortfolio(item)}>
                                    <img src={item.image} alt={item.productName} />
                                    <h3 className='truncate'>{item.productName}</h3>
                                    <p>GHc {item.productPrice}</p>
                                    <div className='flex justify-between'>
                                        <p className='truncate'>{item.productLocation}</p>
                                        <p>Qty: <span className='text-red-600'>{item.quantity} left...</span> </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;