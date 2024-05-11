import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { setMessageFirstName, setMessage, setMessageLastName, setMessageEmail } from '../../stores/reducers/messageReducer';
import { messageUs } from '../../stores/actions';

const Information = ({ isMobile }) => (
    <div className="text-center md:text-left md:w-2/4 md:mr-20 flex flex-col md:flex-row items-center">
        <div>
            <h2 className="font-bold text-[30px] mb-1">Learn More About<span className="text-violet-500 italic"> Tilly&E</span></h2>
            <p className="text-sm mb-8">Looking to reclaim more time for the things that matter most to you? Look no further than TillY&E. With TillY&E, finding skilled and reliable local service providers is a breeze. Whether you need a plumber, mover, painter, or cleaner, our app connects you with trusted professionals in your area. Easily hire, rate, and review service providers, and effortlessly connect with independent contractors for all your service needs, right where you are.</p>

            <h2 className="font-semibold text-[30px] mb-1">Visit<span className="text-violet-500 italic"> Us</span></h2>
            <p className="text-sm font-semibold mb-4 text-gray-700 flex">Come say hello at our office<br></br>6311 Ivy Lane, Suite 700, Greenbelt, MD 20770</p>

            <h2 className="font-semibold text-[30px] mb-1">Reach Out<span className="text-violet-500 italic"> to Us</span></h2>
            <p className={`text-sm font-semibold mb-4 text-gray-700 ${isMobile ? 'text-center' : 'flex'}`}>
                Reach out to us on<br />
                +12024864895<br />
                aadwumapa@gmail.com
            </p>

            <h2 className={`font-semibold text-[30px] mb-1 ${isMobile ? 'justify-center' : 'flex'}`}>Social<span className="text-violet-500 italic"> Media</span></h2>
            <div class="flex gap-4 hover:cursor-pointer mb-9">
                <img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" width="30" height="30" alt="fb" />
                <img src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg" width="30" height="30" alt="tw" />
                <img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="30" height="30" alt="inst" />
                <img src="https://www.svgrepo.com/show/28145/linkedin.svg" width="30" height="30" alt="in" />
            </div>
        </div>
    </div>
);

const ContactForm = ({ formData, handleChange, handleSubmit }) => (
    <div className='md:w-2/4'>
        <h2 className="font-bold text-[30px] mb-1">Get In Touch With Us<span className="text-violet-500 italic"></span></h2>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col mb-8 w-full'>
                <label className='mb-2' htmlFor="firstName">First Name</label>
                <input className='border border-gray-300 rounded-[10px] h-10 p-2'
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col mb-8 w-full'>
                <label className='mb-2' htmlFor="lastName">Last Name</label>
                <input className='border border-gray-300 rounded-[10px] h-10 p-2'
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='flex flex-col mb-8 w-full'>
                <label className='mb-2' htmlFor="email">Email</label>
                <input className='border border-gray-300 rounded-[10px] h-10 p-2'
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="message">Message</label>
                <textarea className='border border-gray-300 rounded-[10px] p-2'
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                ></textarea>
            </div>
            <button className='my-5 w-full btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500' type="submit">Submit</button>        </form>
    </div>
);

const About = () => {
    const dispatch = useDispatch();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(setMessage(formData.message));
        dispatch(setMessageEmail(formData.email));
        dispatch(setMessageFirstName(formData.firstName));
        dispatch(setMessageLastName(formData.lastName));

        dispatch(messageUs());

        console.log(formData);
    };

    return (
        <div className="flex flex-col items-center justify-center py-40 px-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <Information isMobile={isMobile} />
                <ContactForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default About;
