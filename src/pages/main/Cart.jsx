import React, { useContext } from 'react';
import { ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/solid';
import { CartContext } from '../../contexts/cartContext';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateItems, updateTotalAmount, updateTotalQuantity } from '../../stores/reducers/orderReducer';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(cart);

    const handleRemove = (id) => {
        removeFromCart(id);

        const updatedCart = cart.filter(item => item.id !== id);
        const newTotalAmount = updatedCart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
        const newTotalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);

        dispatch(updateItems(updatedCart));
        dispatch(updateTotalAmount(newTotalAmount));
        dispatch(updateTotalQuantity(newTotalQuantity));
    };

    const handleQuantityChange = (id, newQuantity) => {
        updateQuantity(id, newQuantity);

        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        const newTotalAmount = updatedCart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
        const newTotalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);

        dispatch(updateItems(updatedCart));
        dispatch(updateTotalAmount(newTotalAmount));
        dispatch(updateTotalQuantity(newTotalQuantity));
    };

    const handleCheckout = () => {
        navigate('/checkout');
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
                                <button onClick={handleCheckout} className="bg-violet-500 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">Checkout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartScreen;