'use client';

import Link from 'next/link';
import {
    FalconIcon,
    MapPinIcon,
    PhoneIcon,
    EmailIcon,
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    HeadsetIcon
} from '../icons';
import Image from 'next/image';

export default function Footer() {
    const aboutLinks = [
        'Contact Us',
        'About Us',
        'Careers',
        'Press',
        'Cancellation & Returns',
        'Terms of Use'
    ];

    const helpLinks = [
        'Payments',
        'Shipping',
        'My Orders',
        'FAQs',
        'Terms of Use',
        'Security',
        'Privacy'
    ];

    return (
        <footer className="bg-slate-900 text-white relative overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
                    {/* Company Info - Takes full width on mobile, 4 columns on desktop */}
                    <div className="lg:col-span-4 max-w-3xs  space-y-6 lg:space-y-8">
                        {/* Logo and Description */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <FalconIcon width={48} height={48} />
                                <span className="text-4xl sm:text-5xl font-bold tracking-tight">FALCON</span>
                            </div>
                            <p className="text-sm text-slate-100 leading-relaxed max-w-sm">
                                Experience our new platform & Enjoy exciting deals and offers on your day to day
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4 ">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-8 h-8  rounded-full flex items-center justify-center mt-0.5">
                                    <MapPinIcon width="38" height="38" className="text-slate-900" />
                                </div>
                                <p className="text-sm text-white leading-relaxed">
                                    House #64, Road 13, ASA Center, Uttara, Dhaka-1402
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-8 h-8  rounded-full flex items-center justify-center">
                                    <PhoneIcon width="38" height="38" className="" />
                                </div>
                                <p className="text-sm text-white">01729-1497201</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-8 h-8  rounded-full flex items-center justify-center">
                                    <EmailIcon width="38" height="38" className="" />
                                </div>
                                <p className="text-sm text-white">falcon@gmail.com</p>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className=" flex items-center gap-6 ">
                            <p className="text-base font-medium text-slate-200">Follow us on</p>
                            <div className="flex gap-4 items-center ">
                                <Link href="#" className="hover:opacity-75 transition-opacity">
                                    <FacebookIcon width="28" height="28" className="text-slate-50" />
                                </Link>
                                <Link href="#" className="hover:opacity-75 transition-opacity">
                                    <InstagramIcon width="28" height="28" className="text-slate-50" />
                                </Link>
                                <Link href="#" className="hover:opacity-75 transition-opacity">
                                    <TwitterIcon width="28" height="28" className="text-slate-50" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links - Takes 6 columns on desktop */}
                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16">
                        {/* About Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-slate-400">ABOUT</h3>
                            <ul className="space-y-4">
                                {aboutLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-base font-medium text-white hover:text-teal-400 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Help Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-slate-400">HELP</h3>
                            <ul className="space-y-4">
                                {helpLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-base font-medium text-white hover:text-teal-400 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Sidebar - Takes 2 columns on desktop */}
                    <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                        {/* Support Section */}
                        <div className="space-y-6 max-w-46">
                            <h3 className="text-lg font-medium text-slate-400">Need Support?</h3>
                            <div className="border border-slate-100 rounded p-2 flex items-center gap-2">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <HeadsetIcon width="20" height="18" className="text-teal-500" />
                                </div>
                                <span className="text-base font-medium text-white">10724-7814XX</span>
                            </div>
                        </div>

                        {/* Download App Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-slate-400">DOWNLOAD APP</h3>
                            <div className="space-y-3">
                                <div className="w-full h-[54px] relative rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                                    <Image
                                        src="/images/Google.png"
                                        alt="Get it on Google Play"
                                        width={180}
                                        height={54}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="w-full h-[54px] relative rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                                    <Image
                                        src="/images/apple.png"
                                        alt="Download on the App Store"
                                        height={54}
                                        width={180}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                    {/* Payments Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-end gap-y-4 gap-x-12 relative lg:-top-12 lg:content lg:col-start-6 col-span-full">
                        <h3 className="text-lg font-medium text-nowrap text-slate-400">PAYMENTS ACCEPTED</h3>
                        <div className="flex flex-wrap gap-2">
                            {/* Visa */}
                            <div className="w-16 h-11 bg-white rounded-lg border border-neutral-300 flex items-center justify-center shadow-sm p-1">
                                <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5547 2.38477L18.5703 9.14844H16.8828L17.8672 2.38477H19.5547ZM29.75 7.55078L30.9766 4.27148L31.6211 7.55078H29.75ZM32.3008 9.14844H33.6289L32.1367 2.38477H30.7852C30.4727 2.38477 30.1953 2.57422 30.0781 2.87695L27.4102 9.14844H29.2734L29.6406 8.09375H32.0625L32.3008 9.14844ZM26.0938 7.90625C26.1016 6.3125 24.6094 6.23047 24.6289 5.41406C24.6328 5.1875 24.8398 4.94531 25.3008 4.89453C25.5273 4.86914 26.2695 4.84375 27.1953 5.19922L27.5 3.73438C27.1133 3.58203 26.5469 3.4375 25.8516 3.4375C24.2969 3.4375 23.2148 4.35156 23.207 5.63672C23.1992 6.57031 23.9844 7.07422 24.5781 7.39453C25.1875 7.71875 25.3828 7.91016 25.3789 8.17969C25.3742 8.58594 24.9062 8.77734 24.4688 8.78125C23.7812 8.78906 23.3789 8.60156 23.0625 8.46875L22.7578 9.98438C23.0781 10.1172 23.6602 10.2266 24.2695 10.2305C25.9688 10.2305 27.0391 9.33203 27.0469 7.90625ZM21.5625 2.38477L18.7305 9.14844H16.8516L15.4766 4.96875C15.4023 4.73438 15.3398 4.65625 15.1484 4.56641C14.7617 4.38672 14.0859 4.22656 13.5 4.10938L13.5352 2.38477H16.0156C16.3828 2.38477 16.6953 2.60156 16.7656 2.96875L17.6328 7.08594L19.4531 2.38477H21.5625Z" fill="#1434CB" />
                                </svg>
                            </div>
                            {/* Mastercard */}
                            <div className="w-16 h-11 bg-white rounded-lg border border-neutral-300 flex items-center justify-center shadow-sm p-1">
                                <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="10" r="8" fill="#EB001B" />
                                    <circle cx="20" cy="10" r="8" fill="#F79E1B" />
                                    <path d="M16 4.5C17.1 6 17.5 7.9 17.5 10C17.5 12.1 17.1 14 16 15.5C14.9 14 14.5 12.1 14.5 10C14.5 7.9 14.9 6 16 4.5Z" fill="#FF5F00" />
                                </svg>
                            </div>
                            {/* American Express */}
                            <div className="w-16 h-11 bg-blue-600 rounded-lg border border-neutral-300 flex items-center justify-center shadow-sm p-1">
                                <svg width="32" height="12" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.875 0L0 4.25H1.25L1.5 3.5H3.5L3.75 4.25H5L3.125 0H1.875ZM2.5 1L3 2.5H2L2.5 1ZM5.5 4.25V0H7L7.9 2.8L8.8 0H10.3V4.25H9.2V1.2L8.4 4.25H7.4L6.6 1.2V4.25H5.5ZM11 4.25V0H15V1H12V1.8H14.8V2.7H12V3.3H15V4.25H11ZM15.8 0V4.25H16.9V2.8H17.3L18.3 4.25H19.5L18.4 2.7C18.8 2.6 19.2 2.2 19.2 1.6C19.2 0.9 18.7 0 17.8 0H15.8ZM16.9 1H17.7C17.9 1 18.1 1.2 18.1 1.4C18.1 1.7 17.9 1.9 17.7 1.9H16.9V1ZM20.5 4.25H19.5V0H20.5V4.25ZM22.5 4.25H22.3C21.4 4.25 20.8 3.5 20.8 2.2C20.8 0.9 21.4 0 22.6 0H23.8V1H22.6C22.1 1 21.8 1.4 21.8 2.2C21.8 3.1 22.2 3.4 22.7 3.4H22.9L22.5 4.25ZM25 0L23.8 4.25H24.8L25 3.5H26.5L26.7 4.25H27.7L26.5 0H25ZM25.6 1L26 2.5H25.2L25.6 1ZM28 4.25V0H29.2L30.5 2.7V0H31.5V4.25H30.3L29 1.5V4.25H28Z" fill="white" />
                                    <path d="M8 11.5V7.5H11.5V8.3H8.8V8.8H11.3V9.5H8.8V10.7H11.5V11.5H8ZM25 11.5V7.5H28.5V8.3H25.8V8.8H28.3V9.5H25.8V10.7H28.5V11.5H25ZM12 11.5L13.5 9.6L12 7.5H13.2L14 8.8L14.8 7.5H16L14.5 9.5L16 11.5H14.8L14 10.2L13.2 11.5H12ZM16.5 7.5V11.5H17.5V10.2H18.2C18.9 10.2 19.4 9.8 19.4 9C19.4 8.3 19 7.5 18.3 7.5H16.5ZM17.5 8.3H18.2C18.4 8.3 18.5 8.5 18.5 8.7C18.5 8.9 18.4 9 18.2 9H17.5V8.3ZM20 7.5V11.5H21V10H21.3L22.2 11.5H23.2L22.2 9.9C22.5 9.9 22.8 9.6 22.8 9C22.8 8.2 22.4 7.5 21.6 7.5H20ZM21 8.3H21.5C21.7 8.3 21.8 8.4 21.8 8.6C21.8 8.8 21.7 8.9 21.5 8.9H21V8.3ZM29 11.5V10.7H31C31.2 10.7 31.3 10.6 31.3 10.5C31.3 10.4 31.2 10.3 31 10.3H30.2C29.6 10.3 29.3 10 29.3 9.5C29.3 9.1 29.6 7.5 30.7 7.5H32.5L32.1 8.3H30.5C30.3 8.3 30.2 8.4 30.2 8.5C30.2 8.6 30.3 8.8 30.5 8.8H31.3C31.9 8.8 32.2 9.1 32.2 9.6C32.2 10.2 31.9 11.5 30.8 11.5H29Z" fill="white" />
                                </svg>
                            </div>
                            {/* bKash */}
                            <div className="w-16 h-11 bg-white rounded-lg border border-neutral-300 flex items-center justify-center shadow-sm p-1">
                                <div className="w-full h-full relative">
                                    <Image
                                        src="/images/bkash-logo.png"
                                        alt="bKash"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            {/* Nagad */}
                            <div className="w-16 h-11 bg-white rounded-lg border border-neutral-300 flex items-center justify-center shadow-sm p-1">
                                <div className="w-full h-full relative">
                                    <Image
                                        src="/images/Nagad-Logo.png"
                                        alt="Nagad"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Border */}
            <div className="border-t border-white/20"></div>

            {/* Copyright */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-20 py-4">
                <p className="text-sm text-white text-center">
                    Falcon ©2025. Design by xyz
                </p>
            </div>
        </footer>
    );
}
