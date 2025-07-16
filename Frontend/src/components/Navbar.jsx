import React, { useContext, useState } from 'react';
import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import { TransactionContext } from '../context/TransactionContext';


const NavItems = ({title,classProps})=>{
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
  )
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const {connectWallet} = useContext(TransactionContext)
  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img src='Images/logo.png' alt='logo' className='w-32'></img>
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
          <NavItems key={item + index} title={item} />
        ))}
        <li>
          <button onClick={connectWallet} className='text-white bg-[#2952e3] py-2 px-7 mx-4 rounded-full hover:bg-[#2546bd] cursor-pointer'>
            Login
          </button>
        </li>
      </ul>

      <div className='flex relative'>
        {toggleMenu
          ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)}/>
          : <HiMenuAlt4 fontSize={25} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <ul className='z-10 absolute top-12 right-0 bg-[#1c1c24] p-4 rounded-lg shadow-lg md:hidden  blue-glassmorphism list-none animate-slide-in text-white'>
            {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
              <NavItems key={item + index} title={item} classProps='my-2 text-white' />
            ))}
            <li>
              <button onClick={connectWallet} className='text-white bg-[#2952e3] py-2 ml-[-2px] px-7 mx-4 rounded-full hover:bg-[#2546bd] cursor-pointer'>
                Login 
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar