import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { setMessageFirstName, setMessage, setMessageLastName, setMessagePhoneNumber } from '../../stores/reducers/messageReducer';
import { messageUs } from '../../stores/actions';

const Information = ({ isMobile }) => (
    <div className="text-center md:text-left md:w-2/4 md:mr-20 flex flex-col md:flex-row items-center">
        <div>
            <h2 className="font-bold text-[30px] mb-1">Learn More About<span className="text-violet-500 italic"> Tilly and E Honest Pro Artisans</span></h2>
            <p className="text-sm mb-8 text-left">Welcome to Tilly and E Honest Pro Artisans, where Honesty, and excellence is born.
                At Tilly and E Honest Pro Artisans, we understand that finding the right job or the perfect trained
                person can be challenging. That's why we have made it our mission to simplify the
                process, leveraging on technology to have trained personnels to streamline
                recruitment for both employers and job seekers.
            </p>
            <p className="text-sm mb-8 text-left">
                Our team consists of artisans, shop attendants, accountants, cashiers, web
                designers, customer service trainers, elderly care, nanny, teachers and many more.
                With a deep understanding of various job markets, we have a well-equipped, honest
                and hard working team to support businesses of all sizes, we are here to help build
                high-performing teams. Finding the right job can be a life-changing experience, and
                we're here to support you every step of the way. We are committed to empowering
                you to succeed in the job market.
            </p>
            <p className="text-sm mb-8 text-left">
                We uphold the highest standards of ethics and transparency in all our interactions,
                ensuring fairness and trustworthiness throughout the recruitment process.
                At Tilly and E Honest Pro Artisans, we believe that every individual deserves the opportunity to
                fulfil their potential, and every business deserves access to top talent, honest and
                hardworking workers. Join us in shaping the future of recruitment and unleashing the
                power of human potential. Let's embark on this
            </p>

            <h2 className="font-semibold text-[30px] mb-1">WhatsApp<span className="text-violet-500 italic"> Us On</span></h2>
            <p className={`${isMobile ? 'justify-center' : ''} text-sm font-semibold mb-4 text-gray-700 flex`}>+1 (914) 602-3701<br></br>+44 7385 630981</p>


            <h2 className="font-semibold text-[30px] mb-1">Reach Out<span className="text-violet-500 italic"> to Us</span></h2>
            <p className={`text-sm font-semibold mb-4 text-gray-700 ${isMobile ? 'text-center' : 'flex'}`}>
                Reach out to us on<br />
                info.tillyehonestproartisans@gmail.com
            </p>

            <h2 className={`font-semibold text-[30px] mb-1 ${isMobile ? 'justify-center' : 'flex'}`}>Social<span className="text-violet-500 italic"> Media</span></h2>
            <div className={`${isMobile ? 'justify-center' : ''} flex gap-4 hover:cursor-pointer mb-9`}>
                <a href='#top'><img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" width="30" height="30" alt="fb" /></a>
                <a href='#top'><img src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg" width="30" height="30" alt="tw" /></a>
                <a href='https://www.instagram.com/abesjobconsult/'><img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="30" height="30" alt="inst" /></a>
                <a href='https://www.linkedin.com/company/abes-job-consult'><img src="https://www.svgrepo.com/show/28145/linkedin.svg" width="30" height="30" alt="in" /></a>
            </div>
        </div>
    </div>
);

const ContactForm = ({ formData, handleChange, handleSubmit }) => (
    <div className='md:w-2/4 w-full'>
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
                <label className='mb-2' htmlFor="phoneNumber">Phone Number</label>
                <input className='border border-gray-300 rounded-[10px] h-10 p-2'
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
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
            <button className='my-5 w-full btn bg-violet-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500' type="submit">Submit</button>
        </form>
    </div>
);

const About = () => {
    const dispatch = useDispatch();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
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
        dispatch(setMessagePhoneNumber(formData.phoneNumber));
        dispatch(setMessageFirstName(formData.firstName));
        dispatch(setMessageLastName(formData.lastName));

        dispatch(messageUs());

        setFormData({
            message: '',
            phoneNumber: '',
            firstName: '',
            lastName: ''
        });
    };

    return (
        <div className="flex flex-col items-center justify-center py-[120px] px-5">
            <div className="flex flex-col md:flex-row items-start justify-between">
                <Information isMobile={isMobile} />
                <ContactForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default About;
