import React, { useEffect, useState } from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { fetchArtisanData } from '../../../../../stores/actions';
import { useDispatch } from 'react-redux';
import { becomeSeller } from '../../../../../stores/actions';
import { useAuth } from '../../../../../contexts/authContext';
import Tab from '../../components/TabComponent';
import ShopPurchaseTable from './purchases';
import ShopProductScreen from './products';
import ShopSummaryTable from './summary';

const ShopScreen = () => {
    const dispatch = useDispatch();
    const [isSeller, setIsSeller] = useState(false);

    const { currentUser, userLoggedIn } = useAuth();
    const userId = userLoggedIn && currentUser ? currentUser.uid : null;

    useEffect(() => {
        fetchArtisanData(userId).then((res) => {
            setIsSeller(res.seller);
        });
        console.log(isSeller);
    }, [dispatch, userId, isSeller]);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (e) => {
        setOpen(false);
        setLoading(true);
        e.preventDefault();

        try {
            dispatch(becomeSeller(userId));
            alert('You have successfully become a seller!');
        } catch (error) {
            console.error('Error becoming a seller:', error);
            alert('Error becoming a seller, try again...');
        } finally {
            setLoading(false);
        }
    };

    const [activeTab, setActiveTab] = useState('Purchases');

    const renderContent = () => {
        switch (activeTab) {
            case 'Purchases':
                return <ShopPurchaseTable />;
            case 'Products':
                return <ShopProductScreen />;
            case 'Summary':
                return <ShopSummaryTable />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-0 md:p-1">
            {!isSeller &&
                <div className="bg-white shadow-md rounded-lg p-6 max-w-sm text-center">
                    <h2 className="text-xl font-bold mb-2">Become A Seller</h2>
                    <p className="text-gray-600 mb-4">
                        Register as a seller also and start selling your products for profit
                    </p>
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                        onClick={handleClickOpen}
                    >
                        Become A Seller
                    </button>
                </div>
            }
            {
                isSeller &&
                <div className="w-full p-4">
                    <div className="flex flex-row space-x-4 mb-6">
                        <Tab label="Purchases" isActive={activeTab === 'Purchases'} onClick={() => setActiveTab('Purchases')} />
                        <Tab label="Products" isActive={activeTab === 'Products'} onClick={() => setActiveTab('Products')} />
                        <Tab label="Summary" isActive={activeTab === 'Summary'} onClick={() => setActiveTab('Summary')} />
                    </div>
                    {renderContent()}
                </div>
            }

            <Dialog className='rounded-[20px]' open={open} onClose={() => setOpen(false)}>
                <DialogTitle className='font-bold text-sm'>Are you sure you want to become a seller ?</DialogTitle>
                <DialogContent>
                    <Typography className='text-gray-500 text-sm'>
                        Click the Confirm button to start putting your products for sale🎊.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} className='w-full btn bg-gray-300 hover:bg-gray-500 hover:text-white text-black md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} disabled={loading} className='w-full btn bg-violet-600 text-white hover:bg-green-600 hover:text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'>
                        {loading ? 'Please wait...' : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ShopScreen;