import React from 'react'
import logo from '/Images/logo.png'

const Footer = () => {
  return (
    <div className='w-full flex md:justify justify-between items-center flex-col p-4 gradient-bg-footer'>
      <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
        <div className='flex flex-[0.5] justify-center items-center'>
          <img
            src={logo}
            alt='logo'
            className='w-32 cursor-pointer'
          />
        </div>
        <div className='flex flex-1 justify-evenly items-center flex-wrap md:mt-0 mt-10'>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>Market</p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>Exchange</p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>Tutorials</p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>Wallets</p>
        </div>

      </div>
      <div className='flex justify-center items-center flex-col mt-5'>
        <p className='text-white text-sm text-center'>Come Join Us</p>
        <p className='text-white text-sm text-center'>naveennapit@gmail.com</p>

      </div>
      <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5' />
      <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
        <p className='text-white text-sm text-center'>@naveennapit 2025</p>
        <p className='text-white text-sm text-center'>All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer