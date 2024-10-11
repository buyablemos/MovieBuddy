import {useEffect, useState} from 'react';

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token') || !!sessionStorage.getItem('token'));
    }, []);


    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className={`custom-sidebar transition duration-300 ${isHovered ? 'translate-x-0' : 'translate-x-[-18vw]'}`}
            aria-label="Sidebar"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="sidebar-inside flex py-4 rounded">
                <div className="w-[23vw] overflow-y-auto h-[80vh]">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a className="">
                            <button
                                type="button"
                                className="sidebar-item flex w-full text-white hover:text-black"
                                aria-controls="dropdown-example"
                                onClick={toggleDropdown}
                            >
                                <img src="/src/assets/recommendation-icon.png" alt="Recommendation Icon"
                                     className="w-5 h-5"/>
                                <span
                                    className="flex-1 ms-3 text-center whitespace-nowrap">Recommendations</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                                <ul id="dropdown-example" className={`${isOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                                    <li>
                                        <a href="/NNCBF"
                                           className="sidebar-item flex">Neural Network CBF</a>
                                    </li>
                                    <li>
                                        <a href="/NNCF"
                                           className="sidebar-item flex">Neural Network CF</a>
                                    </li>
                                    <li>
                                        <a href="/kNNmovie"
                                           className="sidebar-item flex">kNN - find something by movie title</a>
                                    </li>
                                    <li>
                                        <a href="/kNNhistory"
                                           className="sidebar-item flex">kNN - find something by your history</a>
                                    </li>
                                    <li>
                                        <a href="/SVD"
                                           className="sidebar-item flex">SVD</a>
                                    </li>
                                </ul>
                            </a>
                        </li>
                        <li>
                            <a href="/"
                               className="sidebar-item flex">
                            <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 22 21">
                                    <path
                                        d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path
                                        d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/user-details"
                               className="sidebar-item flex">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 22 21">
                                    <path
                                        d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                </svg>
                                <span className="ms-3">User details</span>
                            </a>
                        </li>
                        <li>
                            <a href="/add-rating"
                               className="sidebar-item flex">
                                <svg className="w-5 h-5 text-yellow-600" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400"
                                     aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                                <span className="ms-3">Reviews</span>
                            </a>
                        </li>
                        {isLoggedIn && <li>
                            <a
                                className="sidebar-item flex"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    sessionStorage.removeItem('token');
                                    window.location.reload();
                                }
                                }
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400"
                                    aria-hidden="true"
                                    fill="currentColor" viewBox="0 0 22 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#555"
                                          d="M10.2392344,0 C13.3845587,0 16.2966635,1.39466883 18.2279685,3.74426305 C18.4595621,4.02601608 18.4134356,4.43777922 18.124942,4.66396176 C17.8364485,4.89014431 17.4148346,4.84509553 17.183241,4.5633425 C15.5035716,2.51988396 12.9739849,1.30841121 10.2392344,1.30841121 C5.32416443,1.30841121 1.33971292,5.19976806 1.33971292,10 C1.33971292,14.8002319 5.32416443,18.6915888 10.2392344,18.6915888 C13.0144533,18.6915888 15.5774656,17.443711 17.2546848,15.3485857 C17.4825482,15.0639465 17.9035339,15.0136047 18.1949827,15.2361442 C18.4864315,15.4586837 18.5379776,15.8698333 18.3101142,16.1544725 C16.3816305,18.5634688 13.4311435,20 10.2392344,20 C4.58426141,20 8.8817842e-14,15.5228475 8.8817842e-14,10 C8.8817842e-14,4.4771525 4.58426141,0 10.2392344,0 Z M17.0978642,7.15999289 L19.804493,9.86662172 C20.0660882,10.1282169 20.071043,10.5473918 19.8155599,10.802875 L17.17217,13.4462648 C16.9166868,13.701748 16.497512,13.6967932 16.2359168,13.435198 C15.9743215,13.1736028 15.9693667,12.7544279 16.2248499,12.4989447 L17.7715361,10.9515085 L7.46239261,10.9518011 C7.0924411,10.9518011 6.79253615,10.6589032 6.79253615,10.2975954 C6.79253615,9.93628766 7.0924411,9.64338984 7.46239261,9.64338984 L17.7305361,9.64250854 L16.1726778,8.08517933 C15.9110825,7.82358411 15.9061278,7.40440925 16.1616109,7.14892607 C16.4170941,6.89344289 16.836269,6.89839767 17.0978642,7.15999289 Z"/>
                                </svg>

                                <span className="ms-3">Logout</span>
                            </a>
                        </li>}
                        {!isLoggedIn && <li>
                            <a href="/login"
                               className="sidebar-item flex">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400"
                                    aria-hidden="true"
                                    fill="currentColor" viewBox="0 0 22 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#555"
                                          d="M9.76076555,0 C15.4157386,0 20,4.4771525 20,10 C20,15.5228475 15.4157386,20 9.76076555,20 C6.56885647,20 3.61836948,18.5634688 1.68988581,16.1544725 C1.46202241,15.8698333 1.51356853,15.4586837 1.80501731,15.2361442 C2.09646608,15.0136047 2.51745178,15.0639465 2.74531518,15.3485857 C4.4225344,17.443711 6.98554674,18.6915888 9.76076555,18.6915888 C14.6758356,18.6915888 18.6602871,14.8002319 18.6602871,10 C18.6602871,5.19976806 14.6758356,1.30841121 9.76076555,1.30841121 C7.02601512,1.30841121 4.49642844,2.51988396 2.81675903,4.5633425 C2.58516542,4.84509553 2.16355149,4.89014431 1.87505796,4.66396176 C1.58656443,4.43777922 1.54043793,4.02601608 1.77203154,3.74426305 C3.70333647,1.39466883 6.61544133,0 9.76076555,0 Z M10.3053281,6.86239745 L13.0119569,9.56902627 C13.2735521,9.83062149 13.2785069,10.2497964 13.0230237,10.5052795 L10.3796339,13.1486694 C10.1241507,13.4041526 9.70497582,13.3991978 9.4433806,13.1376026 C9.18178539,12.8760073 9.1768306,12.4568325 9.43231378,12.2013493 L10.98,10.6534046 L0.669856459,10.6542056 C0.299904952,10.6542056 7.72715225e-14,10.3613078 7.72715225e-14,10 C7.72715225e-14,9.63869222 0.299904952,9.34579439 0.669856459,9.34579439 L10.938,9.34540456 L9.38014161,7.78758389 C9.11854639,7.52598867 9.11359161,7.1068138 9.36907479,6.85133062 C9.62455797,6.59584744 10.0437328,6.60080223 10.3053281,6.86239745 Z"/>
                                </svg>


                                <span className="ms-3">Login</span>
                            </a>
                        </li>}

                    </ul>
                </div>
                <div
                    className={`flex items-center justify-center w-[2vw] text-gray-900`}>
                    <p className="text-white font-light transform rotate-90 whitespace-nowrap">Sidebar</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
