import React, { useContext } from 'react';
import { ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/solid';
import { CartContext } from '../../contexts/cartContext';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
    return (
        <div className="cart-item">
            <div className="cart-item-left">
                <img src={item.image} alt={item.productName} className="cart-item-image" />
                <span className="cart-item-name">{item.productName}</span>
            </div>
            <div className="cart-item-right">
                <span className="cart-item-price">GHc {item.productPrice}</span>
                <div className="cart-item-quantity">
                    <button className="quantity-button" onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="quantity-button ml-2" onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="cart-item-delete" style={{ marginLeft: 'auto' }} onClick={() => onRemove(item.id)}>🗑️</button>
            </div>
        </div>
    );
};

const CartScreen = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);

    console.log(cart);

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleQuantityChange = (id, newQuantity) => {
        updateQuantity(id, newQuantity);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row p-4 w-full py-[130px]">
                <div className="bg-white shadow-md p-4 mb-4 md:mb-0 md:mr-4 md:w-3/12 rounded-md md:block hidden">
                    <ShoppingBagIcon className="w-full rounded-md" />
                </div>
                <div className="bg-white shadow-md p-4 md:w-5/12 rounded-md">
                    {cart.length > 0 ? (
                        cart.map(item => (
                            <CartItem key={item.id} item={item} onRemove={handleRemove} onQuantityChange={handleQuantityChange} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <TrashIcon className="w-24 h-24 text-gray-400" />
                            <p className="text-gray-500 mt-2">Your cart is empty</p>
                        </div>
                    )}
                    {cart.length > 0 && (
                        <div className="flex justify-between">
                            <div className='mt-5'>
                                <span><p className='font-bold'>Total:</p> GHc {totalPrice}</span>
                            </div>
                            <div className="flex justify-end mt-5">
                                <button className="bg-violet-500 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">Checkout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartScreen;