import { useEffect, useState } from 'react';
import { fetchAllProductsByCategory } from '../../../stores/actions';
import { useNavigate } from 'react-router-dom';


const OtherProducts = ({ product }) => {
    const navigate = useNavigate();

    const { category } = product;
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const productsData = async () => {
            try {
                const products = await fetchAllProductsByCategory(category);
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products data:', error);
            }
        };

        productsData();
    }, [category]);

    const groupedProducts = products.reduce((acc, product) => {
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

    if (!product) return null;

    return (
        <div className="shop">
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
    );
};

export default OtherProducts;