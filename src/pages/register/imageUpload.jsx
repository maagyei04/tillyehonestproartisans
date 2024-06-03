import { useState } from 'react';
import RegisterPic4 from '../../assets/images/register4.png';
import ImageIcon from '../../assets/images/image_icon.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setGhanaCardImage, setGaurantorNoteImage, setPassportImage } from '../../stores/reducers/artisanReducer';
import CustomSnackbar from '../../components/common/SnackBar';



const ImageUpload = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const dispatch = useDispatch();

    const artisanData = useSelector((state) => state.artisan) ?? '';

    const navigate = useNavigate();

    const [selectedImages, setSelectedImages] = useState({
        passport: '',
        ghanaCard: '',
        guarantorNote: ''
    });


    const handleImageChange = (identifier, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImages(prevState => ({
                    ...prevState,
                    [identifier]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        } else {
            console.log('No file selected');
            alert('No images has been selected!!, Please do select all images...')
        }
    };

    const dataURLtoBlob = (dataurl) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    const handleSubmit = (e) => {

        if (!areAllImagesSelected()) {
            setOpenSnackbar(true);
            return;
        }

        const passportBlob = dataURLtoBlob(selectedImages.passport);
        const ghanaCardBlob = dataURLtoBlob(selectedImages.ghanaCard);
        const guarantorNoteBlob = dataURLtoBlob(selectedImages.guarantorNote);

        console.log('Passport Image:', selectedImages.passport);
        console.log('Ghana Card Image:', selectedImages.ghanaCard);
        console.log('Guarantor Note Image:', selectedImages.guarantorNote);

        dispatch(setPassportImage(passportBlob));
        dispatch(setGhanaCardImage(ghanaCardBlob));
        dispatch(setGaurantorNoteImage(guarantorNoteBlob));

        e.preventDefault();

        navigate('/register/business_details');
        console.log(artisanData);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const areAllImagesSelected = () => {
        if (selectedImages.ghanaCard === '' && selectedImages.guarantorNote === '' && selectedImages.guarantorNote === '') {
            return false;
        }
        return true;
    };

    return (

        <div className="flex flex-col items-center justify-center py-20 px-10">
            <CustomSnackbar open={openSnackbar} message="Please select all images before submitting the form." onClose={handleCloseSnackbar} />
            <div className="flex flex-col md:flex-row items-start justify-between md:space-x-5">
                <div className='text-center md:text-left mt-5 md:h-4/4 md:w-2/4 mr-10 flex flex-col md:flex-row items-start'>
                    <img className="md:h-3/4 mb-4 md:mb-0 hidden md:block" src={RegisterPic4} alt="content" />
                </div>
                <div className="md:w-2/4">
                    <div className='mb-5'>
                        <label htmlFor="passport-upload" className="font-semibold text-sm text-gray-500"> Upload Your Passport Picture</label>
                        <label>
                            <div className='relative border-dotted border-2 border-gray-400 rounded-lg overflow-hidden cursor-pointer'>
                                {selectedImages.passport ? (
                                    <img src={selectedImages.passport} alt="Selected" className="w-auto h-auto object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <img src={ImageIcon} alt="Icon" className="w-16 h-16 mb-2" />
                                        <span className="text-sm text-gray-600">Drop your image here, or <span className='text-violet-600'>Browse</span></span>
                                        <span className="text-xs text-gray-600">Support PNG, JPG, JPEG, WEBP</span>
                                    </div>
                                )}
                                <input name='passport-upload' type="file" id="passport-upload" className="hidden" onChange={(e) => handleImageChange('passport', e)} accept="image/*" />
                            </div>
                        </label>
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="ghanaCard-upload" className="font-semibold text-sm text-gray-500"> Upload Your Ghana Card</label>
                        <label>
                            <div className='relative border-dotted border-2 border-gray-400 rounded-lg overflow-hidden cursor-pointer'>
                                {selectedImages.ghanaCard ? (
                                    <img src={selectedImages.ghanaCard} alt="Selected" className="w-auto h-auto object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <img src={ImageIcon} alt="Icon" className="w-16 h-16 mb-2" />
                                        <span className="text-sm text-gray-600">Drop your image here, or <span className='text-violet-600'>Browse</span></span>
                                        <span className="text-xs text-gray-600">Support PNG, JPG, JPEG, WEBP</span>
                                    </div>
                                )}
                                <input name='ghanaCard-upload' type="file" id="ghanaCard-upload" className="hidden" onChange={(e) => handleImageChange('ghanaCard', e)} accept="image/*" />
                            </div>
                        </label>
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="guarantorNote-upload" className="font-semibold text-sm text-gray-500"> Guarantor Note</label>
                        <label>
                            <div className='relative border-dotted border-2 border-gray-400 rounded-lg overflow-hidden cursor-pointer'>
                                {selectedImages.guarantorNote ? (
                                    <img src={selectedImages.guarantorNote} alt="Selected" className="w-auto h-auto object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <img src={ImageIcon} alt="Icon" className="w-16 h-16 mb-2" />
                                        <span className="text-sm text-gray-600">Drop your image here, or <span className='text-violet-600'>Browse</span></span>
                                        <span className="text-xs text-gray-600">Support PNG, JPG, JPEG, WEBP</span>
                                    </div>
                                )}
                                <input name='gaurantorNote-upload' type="file" id="gaurantorNote-upload" className="hidden" onChange={(e) => handleImageChange('guarantorNote', e)} accept="image/*" />
                            </div>
                        </label>
                    </div>
                    <button type='submit' onClick={handleSubmit} className="bg-violet-500 text-white py-3 px-4 rounded-[10px] hover:bg-green-600 w-full">Next</button>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
