const CartItem = ({ item }) => {
    return (
        <div className="cart-item">
            <div className="cart-item-left">
                <input type="checkbox" checked={item.checked} />
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <span className="cart-item-name">{item.name}</span>
            </div>
            <div className="cart-item-right">
                <button className="cart-item-delete">🗑️</button>
                <span className="cart-item-price">{item.price}</span>
                <div className="cart-item-quantity">
                    <button className="quantity-button">-</button>
                    <span>{item.quantity}</span>
                    <button className="quantity-button">+</button>
                </div>
            </div>
        </div>
    );
};

const CartScreen = () => {
    const cartItems = [
        {
            id: 1,
            name: 'Azar Paint',
            image: 'path/to/azar-paint.jpg',
            price: 'GHC100',
            quantity: 1,
            checked: true,
        },
        {
            id: 2,
            name: 'Roofing Sheet',
            image: 'path/to/roofing-sheet.jpg',
            price: 'GHC100',
            quantity: 1,
            checked: false,
        },
    ];

    return (
        <div>
            <h1>Cart</h1>
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CartScreen;