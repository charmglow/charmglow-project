import { Divider } from 'antd';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarker } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <Divider />
            <div className="py-6">
                <div className="container mx-auto flex flex-col items-center lg:flex-row justify-between">
                    <div className="text-center lg:text-left mb-4 lg:mb-0">
                        <p className="text-2xl font-bold">Connect with Us</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-3xl text-blue-500 hover:text-blue-600 transition duration-300"><FaFacebook /></a>
                            <a href="#" className="text-3xl text-blue-500 hover:text-blue-600 transition duration-300"><FaTwitter /></a>
                            <a href="#" className="text-3xl text-red-500 hover:text-red-600 transition duration-300"><FaInstagram /></a>
                            <a href="#" className="text-3xl text-blue-500 hover:text-blue-600 transition duration-300"><FaLinkedin /></a>
                        </div>
                    </div>
                    <div className="text-center lg:text-left mb-4 lg:mb-0">
                        <div>
                            <p className="text-xl"><FaPhone /> +1 (123) 456-7890</p>
                        </div>
                        <div>
                            <p className="text-xl"><FaEnvelope /> info@example.com</p>
                        </div>
                        <div>
                            <p className="text-xl"><FaMapMarker /> 123 Main Street, City, Country</p>
                        </div>
                    </div>
                    <div className="text-center lg:text-right">
                        <p className="text-sm">© {new Date().getFullYear()} charmglowjewelry.com</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
