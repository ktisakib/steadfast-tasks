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
                                    <path d="M23.3947 0.401051L20.2408 15.1437H16.4272L19.5815 0.401051H23.3947ZM39.4401 9.92045L41.448 4.38407L42.6033 9.92045H39.4401ZM43.6952 15.1437H47.2228L44.1445 0.401051H40.8885C40.1568 0.401051 39.5395 0.826603 39.2647 1.48266L33.5431 15.1437H37.548L38.3431 12.9422H43.236L43.6952 15.1437ZM33.7418 10.3301C33.7582 6.43904 28.3608 6.22487 28.3982 4.48673C28.4094 3.95712 28.9138 3.39532 30.0155 3.25113C30.5628 3.17974 32.0676 3.12515 33.7764 3.91139L34.4455 0.785075C33.5277 0.451912 32.3467 0.131348 30.8778 0.131348C27.1084 0.131348 24.4553 2.13546 24.4329 5.00514C24.4091 7.1273 26.3269 8.31157 27.772 9.01709C29.2577 9.73987 29.7569 10.2028 29.7504 10.849C29.7406 11.8387 28.5652 12.2745 27.4687 12.2918C25.5509 12.3221 24.438 11.7743 23.551 11.3609L22.8599 14.5913C23.7507 15.0005 25.3955 15.356 27.1019 15.3742C31.1078 15.3742 33.7288 13.3949 33.7418 10.3301ZM17.9451 0.401051L11.7662 15.1437H7.73417L4.69372 3.37805C4.50894 2.6534 4.34842 2.38836 3.78709 2.08273C2.87112 1.58579 1.35696 1.1187 0.0247803 0.829403L0.11577 0.401051H6.60497C7.43181 0.401051 8.17606 0.951656 8.36364 1.90402L9.96972 10.4356L13.9383 0.401051H17.9451Z" fill="#1434CB"  />
                                </svg>

                            </div>
                            {/* Mastercard */}
                            <div className="w-16 h-11 bg-white rounded-lg border border-neutral-300 flex items-center justify-center shadow-sm p-1">
                                <svg width="38" height="23" viewBox="0 0 38 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.2812 2.55525H14.3257V20.4456H24.2812V2.55525Z" fill="#FF5F00" />
                                    <path d="M14.9578 11.5004C14.9563 9.77742 15.3467 8.07668 16.0996 6.52692C16.8525 4.97715 17.9481 3.61899 19.3035 2.55524C17.625 1.23594 15.6092 0.415492 13.4866 0.187662C11.3639 -0.0401681 9.21991 0.333807 7.29972 1.26686C5.37953 2.19991 3.76058 3.6544 2.62794 5.46405C1.49529 7.2737 0.894653 9.36551 0.894653 11.5004C0.894653 13.6353 1.49529 15.7271 2.62794 17.5367C3.76058 19.3464 5.37953 20.8009 7.29972 21.7339C9.21991 22.667 11.3639 23.0409 13.4866 22.8131C15.6092 22.5853 17.625 21.7648 19.3035 20.4455C17.9481 19.3818 16.8525 18.0236 16.0996 16.4739C15.3467 14.9241 14.9563 13.2234 14.9578 11.5004Z" fill="#EB001B" />
                                    <path d="M37.7117 11.5004C37.7118 13.6352 37.1112 15.727 35.9786 17.5367C34.846 19.3463 33.2271 20.8008 31.307 21.7339C29.3868 22.667 27.2429 23.0409 25.1202 22.8131C22.9976 22.5853 20.9819 21.7648 19.3035 20.4455C20.6576 19.3807 21.7524 18.0223 22.5052 16.4728C23.2579 14.9233 23.649 13.2231 23.649 11.5004C23.649 9.7777 23.2579 8.07749 22.5052 6.52797C21.7524 4.97844 20.6576 3.62006 19.3035 2.55524C20.9819 1.23594 22.9976 0.415486 25.1202 0.187659C27.2429 -0.0401682 29.3868 0.333824 31.307 1.26689C33.2271 2.19995 34.846 3.65443 35.9786 5.46408C37.1112 7.27374 37.7118 9.36554 37.7117 11.5004Z" fill="#F79E1B"  />
                                    <path d="M36.6262 18.5507V18.1844H36.7739V18.1098H36.3978V18.1844H36.5455V18.5507H36.6262ZM37.3564 18.5507V18.1091H37.2411L37.1085 18.4128L36.9759 18.1091H36.8605V18.5507H36.9419V18.2176L37.0663 18.5048H37.1507L37.2751 18.2168V18.5507H37.3564Z" fill="#F79E1B" />
                                </svg>

                            </div>
                            {/* American Express */}
                            <div className="w-16 h-11 bg-blue-600 rounded-lg border border-neutral-300 flex items-center justify-center shadow-sm p-1">
                                <svg width="58" height="19" viewBox="0 0 58 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.92484 0.00116113L-0.000244141 6.80247H1.90415L2.44387 5.44052H5.58151L6.11839 6.80247H8.06477L5.14235 0.00116113H2.92484ZM4.00706 1.58398L4.96343 3.96395H3.04791L4.00706 1.58398ZM8.26607 6.80131V0L10.9723 0.0100342L12.5463 4.39512L14.0827 0H16.7673V6.80131H15.067V1.78982L13.2647 6.80131H11.7736L9.96632 1.78982V6.80131H8.26607ZM17.9306 6.80131V0H23.4788V1.52134H19.6487V2.6847H23.3893V4.11661H19.6487V5.32475H23.4788V6.80131H17.9306ZM24.4631 0.00116113V6.80247H26.1634V4.38619H26.8792L28.9178 6.80247H30.9956L28.7585 4.2967C29.6766 4.21921 30.6237 3.43116 30.6237 2.20765C30.6237 0.776447 29.5004 0.00116113 28.2467 0.00116113H24.4631ZM26.1634 1.5225H28.1069C28.5732 1.5225 28.9123 1.88721 28.9123 2.23839C28.9123 2.69021 28.4728 2.95435 28.1321 2.95435H26.1634V1.5225ZM33.0538 6.80131H31.3178V0H33.0538V6.80131ZM37.1702 6.80131H36.7955C34.9824 6.80131 33.8816 5.37277 33.8816 3.42861C33.8816 1.43637 34.9701 0 37.2597 0H39.1389V1.61083H37.191C36.2615 1.61083 35.6042 2.33624 35.6042 3.44537C35.6042 4.76255 36.3558 5.31576 37.4386 5.31576H37.8861L37.1702 6.80131ZM40.8699 0.00116113L37.9448 6.80247H39.8492L40.3889 5.44052H43.5265L44.0635 6.80247H46.0098L43.0875 0.00116113H40.8699ZM41.9521 1.58398L42.9085 3.96395H40.9929L41.9521 1.58398ZM46.2083 6.80131V0H48.37L51.1301 4.27321V0H52.8304V6.80131H50.7386L47.9086 2.41628V6.80131H46.2083ZM12.3825 18.7036V11.9023H17.9306V13.4236H14.1006V14.5871H17.8411V16.0189H14.1006V17.227H17.9306V18.7036H12.3825ZM39.5685 18.7036V11.9023H45.1166V13.4236H41.2866V14.5871H45.0092V16.0189H41.2865V17.227H45.1165V18.7036H39.5685ZM18.1459 18.7036L20.8473 15.3449L18.0816 11.9023H20.2237L21.8708 14.0305L23.5236 11.9023H25.5818L22.8524 15.303L25.5588 18.7036H23.417L21.8177 16.609L20.2573 18.7036H18.1459ZM25.7607 11.9035V18.7048H27.5057V16.557H29.2954C30.8098 16.557 31.9576 15.7536 31.9576 14.1911C31.9576 12.8967 31.0573 11.9035 29.5163 11.9035H25.7607ZM27.5057 13.4416H29.3904C29.8797 13.4416 30.2294 13.7415 30.2294 14.2246C30.2294 14.6785 29.8815 15.0077 29.3849 15.0077H27.5057V13.4416ZM32.6959 11.9023V18.7036H34.3961V16.2873H35.112L37.1506 18.7036H39.2284L36.9913 16.1979C37.9093 16.1204 38.8564 15.3323 38.8564 14.1088C38.8564 12.6776 37.7331 11.9023 36.4795 11.9023H32.6959ZM34.3961 13.4236H36.3397C36.8059 13.4236 37.1451 13.7883 37.1451 14.1396C37.1451 14.5914 36.7056 14.8555 36.3648 14.8555H34.3961V13.4236ZM45.9041 18.7036V17.227H49.3068C49.8103 17.227 50.0283 16.9549 50.0283 16.6565C50.0283 16.3706 49.811 16.0815 49.3068 16.0815H47.7691C46.4326 16.0815 45.6882 15.2672 45.6882 14.0445C45.6882 12.954 46.3698 11.9023 48.3561 11.9023H51.667L50.9511 13.4326H48.0875C47.5402 13.4326 47.3717 13.7198 47.3717 13.9942C47.3717 14.2761 47.5799 14.5871 47.998 14.5871H49.6088C51.0987 14.5871 51.7453 15.4322 51.7453 16.539C51.7453 17.729 51.0249 18.7036 49.5277 18.7036H45.9041ZM52.1444 18.7036V17.227H55.5471C56.0506 17.227 56.2685 16.9549 56.2685 16.6565C56.2685 16.3706 56.0513 16.0815 55.5471 16.0815H54.0094C52.6728 16.0815 51.9285 15.2672 51.9285 14.0445C51.9285 12.954 52.6101 11.9023 54.5963 11.9023H57.9073L57.1914 13.4326H54.3278C53.7805 13.4326 53.6119 13.7198 53.6119 13.9942C53.6119 14.2761 53.8201 14.5871 54.2383 14.5871H55.8491C57.3391 14.5871 57.9856 15.4322 57.9856 16.539C57.9856 17.729 57.2652 18.7036 55.768 18.7036H52.1444Z" fill="white"  />
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
