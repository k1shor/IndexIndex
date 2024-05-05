'use client';
import React from 'react'
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose, } from 'react-icons/ai'
import { IoIosMail, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io";

import { useState } from 'react';
import { usePathname } from 'next/navigation'
import Image from 'next/image';

const Navbar = () => {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false);
    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }
    return (
        <nav className="sticky w-full py-2 top-0 bg-[#5ce1e6] z-10"  >
            <div className='flex justify-between items-center h-full w-full px-4 xl:px-16'>
                <div className=''> 
                    {/* <h1 className='text-3xl font-semibold'>Index It Hub</h1> */}
                    <Link href="/">
                        <Image src={'/logo.png '} alt='Logo' width={150} height={50} className='cursor-pointer' priority />
                        {/* <h1>Index It Hub</h1> */}
                    </Link>
                </div>
                <div className='hidden md:flex '>
                    <ul className='hidden md:flex text-white'>
                        <Link href={'/'}>
                            <li className={`ml-10 text-xl ${pathname === '/' ? 'text-[#13294b]' : 'hover:text-[#13294b]'}`}>Home</li>
                        </Link>
                        <Link href={'/about'}>
                            <li className={`ml-10  text-xl ${pathname === '/about' ? 'text-[#13294b]' : 'hover:text-[#13294b]'}`}>About</li>
                        </Link>
                        <Link href={'/service'}>
                            <li className={`ml-10 text-xl ${pathname === '/service' ? 'text-[#13294b]' : 'hover:text-[#13294b]'}`}>Service</li>
                        </Link>
                        <Link href={'/project'}>
                            <li className={`ml-10 text-xl ${pathname === '/project' ? 'text-[#13294b]' : 'hover:text-[#13294b]'}`}>Project</li>
                        </Link>
                        <Link href={'/career'}>
                            <li className={`ml-10 text-xl ${pathname === '/career' ? 'text-[#13294b]' : 'hover:text-[#13294b]'}`}>Career</li>
                        </Link>
                        <Link href={'/contact'}>
                            <li className={`ml-10 text-xl ${pathname === '/contact' ? 'text-[#13294b]' : 'hover:text-[#13294b]'}`}>Contact</li>
                        </Link>
                    </ul>
                </div>
                <div onClick={handleNav} className='sm:hidden cursor-pointer'>
                    <AiOutlineMenu size={25} />
                </div>
            </div>
            <div className={
                menuOpen ? "fixed right-0 top-0 w-[65%] sm:hidden h-screen opacity-80 bg-[#5ce1e6] p-10 ease-in duration-100"
                    : "fixed left-[-100%] top-0 p-10 ease-in duration-100"
            }>
                <div className='flex w-full items-center justify-end'>
                    <div onClick={handleNav} className='sm:hidden cursor-pointer'>
                        <AiOutlineClose size={25} />
                    </div>
                </div>
                <div className='flex-col py-4 text-[#13294b] font-bold'>
                    <ul>
                        <Link href={'/'}>
                            <li className={`py-4 cursor-pointer ${pathname === '/' ? 'text-white' : 'hover:text-white'}`}>Home</li>
                        </Link>
                        <Link href={'/about'}>
                            <li className={`py-4 cursor-pointer ${pathname === '/about' ? 'text-white' : 'hover:text-white'}`}>About</li>
                        </Link>
                        <Link href={'/service'}>
                            <li className={`py-4 cursor-pointer ${pathname === '/service' ? 'text-white' : 'hover:text-white'}`}>Services</li>
                        </Link>
                        <Link href={'/project'}>
                            <li className={`py-4 cursor-pointer ${pathname === '/project' ? 'text-white' : 'hover:text-white'}`}>Project</li>
                        </Link>
                        <Link href={'/career'}>
                            <li className={`py-4 cursor-pointer ${pathname === '/career' ? 'text-white' : 'hover:text-white'}`}>Career</li>
                        </Link>
                        <Link href={'/contact'}>
                            <li className={`py-4 cursor-pointer ${pathname === '/contact' ? 'text-white' : 'hover:text-white'}`}>Contact</li>
                        </Link>
                    </ul>
                </div>
                <div className='flex flex-row justify-around pt-7 item-center'>
                    <IoLogoInstagram size={35} className='cursor-pointer text-[#13294b] hover:text-white' />
                    <IoLogoFacebook size={35} className='cursor-pointer text-[#13294b] hover:text-white' />
                    <IoLogoTwitter size={35} className='cursor-pointer text-[#13294b] hover:text-white' />
                    <IoIosMail size={35} className='cursor-pointer text-[#13294b] hover:text-white ' />
                    <IoLogoLinkedin size={35} className='cursor-pointer text-[#13294b] hover:text-white' />
                </div>
            </div>
        </nav>
    );
}

export default Navbar