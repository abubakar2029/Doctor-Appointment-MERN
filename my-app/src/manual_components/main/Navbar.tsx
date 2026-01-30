import React, { useState } from 'react'
import appIcon from '../../assets/appIcon.png'
import { Link } from 'react-router-dom';
import { PrimaryButton } from './PrimaryButton';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-[#ECECEC] tracking-widest fixed w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <div className='w-2/6'>
                    <a
                        href="https://flowbite.com/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src={appIcon}
                            className="h-7"
                            alt="Doctor Appointment Logo"
                        />
                        <span className="self-center text-2xl text-primary text-heading font-semibold whitespace-nowrap">
                            Health<span className="text-secondary">care</span>
                        </span>
                    </a>
                </div>


                <div className="inline-flex md:order-2 space-x-7 rtl:space-x-reverse">

                    <Link
                        to={"/patientSignup"}
                        type="button"
                        className="text-primary underline-expand  box-border border border-transparent font-medium leading-5 rounded-base text-sm py-2"
                    >
                        Sign Up
                    </Link>
                    <PrimaryButton
                        link={"/login"}
                        fontWeight='font-bold'
                        py='py-0.5'
                        text='Log In'
                    />
                    <button
                        data-collapse-toggle="navbar-cta"
                        type="button"
                        className={`inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary`}
                        aria-controls="navbar-cta"
                        aria-expanded={isMenuOpen ? "true" : "false"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth={2}
                                d="M5 7h14M5 12h14M5 17h14"
                            />
                        </svg>
                    </button>
                </div>

                {/* Hamburger menu */}
                <div
                    className={`items-center justify-between ${isMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                        <Link
                            to={"/"}
                            className="block py-2 hover:text-primary transition-all duration-300 underline-expand px-3 rounded md:bg-transparent md:p-0"
                        >
                            Home
                        </Link>
                        <Link
                            to={"/appointments"}
                            className="block py-2 hover:text-primary transition-all duration-300 underline-expand px-3 rounded md:bg-transparent md:p-0"
                        >
                            Appointments
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar