import React, { useState } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {

    const [isOpen,setIsOpen]=useState(false)

    const toggleMenu=()=>{
        setIsOpen(!isOpen)
    }

  return (
    <>
    
    <nav className='bg-slate-950 text-white px-6 md:px-10 py-4 flex items-center justify-between border-b border-slate-800 shadow-lg'>

        <div className='logo'>
            <h1 className='text-2xl font-bold text-blue-400'>
                CryptoPulse
            </h1>

            <p className='text-sm text-gray-400'>
                Cryptocurrencies
            </p>
        </div>

        <ul className={`
        nav-links
        md:flex
        gap-8
        font-medium
        text-gray-300
        absolute md:static
        top-[80px]
        left-0
        w-full md:w-auto
        bg-slate-900 md:bg-transparent
        px-6 md:px-0
        py-6 md:py-0
        transition-all duration-300
        ${isOpen ? "flex flex-col" : "hidden"}
        `}>

            <li><a href="" className='hover:text-blue-400'>Cryptocurrencies</a></li>

            <li><a href="" className='hover:text-blue-400'>Learn</a></li>

            <li><a href="" className='hover:text-blue-400'>Individuals</a></li>

            <li><a href="" className='hover:text-blue-400'>Business</a></li>

            <li><a href="" className='hover:text-blue-400'>Developers</a></li>

            <li><a href="" className='hover:text-blue-400'>Company</a></li>

        </ul>

        <div
        className='md:hidden cursor-pointer'
        onClick={toggleMenu}
        >
            {isOpen ? (
                <FaTimes size={25}/>
            ) : (
                <FaBars size={25}/>
            )}
        </div>

    </nav>

    </>
  )
}

export default Navbar