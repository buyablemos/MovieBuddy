import { useState } from 'react';

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
                                className="sidebar-item flex w-full"
                                aria-controls="dropdown-example"
                                onClick={toggleDropdown}
                            >
                                <img src="/src/assets/recommendation-icon.png" alt="Recommendation Icon"
                                     className="w-5 h-5"/>
                                <span
                                    className="flex-1 ms-3 text-center text-black whitespace-nowrap">Recommendations</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <ul id="dropdown-example" className={`${isOpen ? 'block' : 'hidden'} py-2 space-y-2`}>
                                <li>
                                    <a href="#"
                                       className="sidebar-item flex">Option 1</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="sidebar-item flex">Option 2</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="sidebar-item flex">Option 3</a>
                                </li>
                            </ul>
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard"
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
