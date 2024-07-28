import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../../../contexts/authContext';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { fetchBusinessFieldsCategories, uploadProductImage, addProductToShop, fetchAllProductsByUserId, deleteProductById } from '../../../../../stores/actions';

const ProductForm = ({ categories }) => {
    const [category, setCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productLocation, setProductLocation] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);


    const { currentUser, userLoggedIn } = useAuth();
    const userId = userLoggedIn && currentUser ? currentUser.uid : null;

    const handleAddProduct = async () => {
        if (!category || !productName || !productPrice || !quantity || !image || !productLocation) {
            alert('Please fill in all fields and upload an image.');
            return;
        }

        try {
            setLoading(true);
            const imageUrl = await uploadProductImage(image);
            const newProduct = {
                userId,
                category,
                productName,
                productPrice,
                productLocation,
                quantity,
                image: imageUrl,
            };

            await addProductToShop(newProduct).then(() => {
                alert('Product added successfully');
            }).catch((error) => {
                console.error('Error adding product:', error);
                alert('Error adding product');
            });

            setProductName('');
            setProductPrice('');
            setProductLocation('');
            setQuantity('');
            setImage(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-70">Select Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-full bg-${index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'green' : 'yellow'}-500`}></div>
                                <span>{category}</span>
                            </div>
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-7000">Product Location</label>
                <input
                    type="text"
                    value={productLocation}
                    onChange={(e) => setProductLocation(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Product Price</label>
                <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Upload Product Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500"
                />
                {imagePreview && (
                    <div className="mt-2">
                        <img src={imagePreview} alt="Product Preview" className="w-36 h-36 object-cover" />
                    </div>
                )}
            </div>
            <div className="w-full">
                <button
                    type="button"
                    onClick={handleAddProduct}
                    className="w-full py-2 px-4 bg-violet-600 text-white rounded-md shadow-sm hover:bg-yellow-600"
                >
                    {loading ? 'Adding Product...' : 'Add Product'}
                </button>
            </div>
        </form>
    );
};

const ProductList = ({ userId }) => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshData, setRefreshData] = useState(false);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            setLoading(true);
            await deleteProductById(productId);
            setProducts(products.filter(product => product.id !== productId));
            setRefreshData(!refreshData);
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = (productId) => {
        setOpen(false);
        handleDeleteProduct(productId);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await fetchAllProductsByUserId(userId);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (userId) {
            fetchProducts();
        }
    }, [userId, refreshData]);

    return (
        <div className="p-4">
            <h2 className="text-lg font-medium mb-2">Added Products</h2>
            <p className="text-sm text-gray-500 mb-4">Tap the X button to remove products</p>
            {products.map((product, index) => (
                <div key={index} className="relative flex mb-4 border rounded-md shadow-sm">
                    <img
                        src={product.image}
                        alt={product.productName}
                        className="w-36 h-36 object-cover"
                    />
                    <div className="flex flex-col p-4 truncate">
                        <h3 className="text-lg font-medium truncate">{product.productName}</h3>
                        <p className="text-sm text-gray-500">GHC {product.productPrice}</p>
                        <p className="text-sm text-gray-500 truncate">{product.productLocation}</p>
                        <p className="text-sm text-gray-500">Q: {product.quantity}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleClickOpen()}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        <XCircleIcon className="h-7 w-7" />
                    </button>
                    <Dialog className='rounded-[20px]' open={open} onClose={() => setOpen(false)}>
                        <DialogTitle className='font-bold text-sm'>Are you sure you want to delete this product ?</DialogTitle>
                        <DialogContent>
                            <Typography className='text-gray-500 text-sm'>
                                Click the Confirm button to delete this product.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} className='w-full btn bg-gray-300 hover:bg-gray-500 hover:text-white text-black md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                                Cancel
                            </Button>
                            <Button onClick={() => handleClose(product.id)} disabled={loading} className='w-full btn bg-violet-600 text-white hover:bg-green-600 hover:text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                                {loading ? 'Please wait...' : 'Confirm'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ))}
        </div>

    );
};

const ShopProductScreen = () => {
    const [categories, setCategories] = useState([]);
    const { currentUser, userLoggedIn } = useAuth();
    const userId = userLoggedIn && currentUser ? currentUser.uid : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchBusinessFieldsCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 shadow-xl">
                    <div className="p-4 bg-white rounded-md shadow-sm">
                        <ProductForm categories={categories} />
                    </div>
                </div>
                <div className="md:col-span-1 shadow-xl">
                    <div className="p-4 bg-white rounded-md shadow-sm">
                        <ProductList userId={userId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopProductScreen;