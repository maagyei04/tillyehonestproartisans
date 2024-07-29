import React, { useContext } from 'react';
import { CartContext } from '../../../contexts/cartContext';
import { useNavigate } from 'react-router-dom';

const ProductDetail = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    const navigate = useNavigate()

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    };

    return (
        <div className="flex flex-col md:flex-row p-4 w-full">
            <div className="bg-white shadow-md p-4 mb-4 md:mb-0 md:mr-4 md:w-3/12 rounded-md">
                <img src={product.image} alt={product.productName} className="w-full rounded-md" />
            </div>
            <div className="bg-white shadow-md p-4 md:w-5/12 rounded-md">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                    <h1 className="text-2xl font-bold">{product.productName}</h1>
                    <p className="text-gray-700 text-lg font-bold">GHc {product.productPrice}</p>
                </div>
                <div className="text-gray-700 mb-4">
                    <p className="text-lg font-bold">{product.productDetails}</p>
                </div>
                <div className="text-gray-700 mb-6">
                    <p>Location: {product.productLocation}</p>
                    <p>Category: {product.category}</p>
                    <p>Quantity: <span className="text-red-500">{product.quantity} left...</span></p>
                </div>
                <button onClick={handleAddToCart} className="w-full py-2 bg-blue-500 text-white rounded-md">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;