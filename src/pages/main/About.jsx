import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { setMessageFirstName, setMessage, setMessageLastName, setMessageEmail } from '../../stores/reducers/messageReducer';
import { messageUs } from '../../stores/actions';

const Information = ({ isMobile }) => (
    <div className="text-center md:text-left md:w-2/4 md:mr-20 flex flex-col md:flex-row items-center">
        <div>
            <h2 className="font-bold text-[30px] mb-1">Learn More About<span className="text-violet-500 italic"> Abes job Consult</span></h2>
            <p className="text-sm mb-8 text-left">Welcome to Abes job Consult, where Honesty, and excellence is born.
                At Abes Job Consult, we understand that finding the right job or the perfect trained
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
                At Abes Job Consult, we believe that every individual deserves the opportunity to
                fulfil their potential, and every business deserves access to top talent, honest and
                hardworking workers. Join us in shaping the future of recruitment and unleashing the
                power of human potential. Let's embark on this
            </p>

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
        <div className="flex flex-col items-center justify-center py-20 px-5">
            <div className="flex flex-col md:flex-row items-start justify-between">
                <Information isMobile={isMobile} />
                <ContactForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default About;
