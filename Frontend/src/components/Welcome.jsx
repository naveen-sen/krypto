import React, { useContext } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import {SiEthereum} from 'react-icons/si'
import {BsInfoCircle} from 'react-icons/bs'
import {toast} from 'react-toastify'

import Loader from './Loader'
import { TransactionContext } from '../context/TransactionContext'

const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const Input = ({placeholder,name,value,type,handleChange})=>{
  return (
    <input
      placeholder={placeholder}
      name={name}
      value={value}
      type={type}
      step="0.0001"
      onChange={(e)=>handleChange(e,name)}
      className={`my-2  w-full p-2 border-none border-gray-400 rounded-md white-glassmorphism outline-none bg-transparent text-white`}
    />
  )
}


const Welcome = () => {
  const {connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,transactions,loading} = useContext(TransactionContext) 

  const isLoading = ()=> loading

  const handleSubmit = (e)=>{
    const {addressTo,amount,keyword,message} = formData

    e.preventDefault()

    if(!addressTo || !amount || !keyword || !message) return toast.warning("Please fill all the fields")

    sendTransaction()
  }
  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 text-white'>
        <div className='flex flex-1 justify-start flex-col md:mr-10'>
          <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
            Send Crypto <br />
            Across The World
          </h1>
          <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
          </p>
          {!currentAccount && (
            <button 
            type='button'
            onClick={connectWallet}
            className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'
          >
            <p className='text-white text-base font-semibold'>Connect Wallet</p>
            </button>
          )}

            <div className='grid sm:grid:3 grid-cols-3 w-full mt-10'>
              <div className={`rounded-tl-2xl ${commonStyles}`}>
                Reliability
              </div>
              <div className={`${commonStyles} `}>
                Security
              </div>
              <div className={`rounded-tr-2xl ${commonStyles}`}>
                Ethereum
              </div>
              <div className={`rounded-bl-2xl ${commonStyles}`}>
                Web 3.0
              </div>
              <div className={` ${commonStyles}`}>
                Low Fees
              </div>
              <div className={`rounded-br-2xl ${commonStyles}`}>
                Blockchain
              </div>
            </div>

        </div>
        <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
          <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
            <div className='flex justify-between flex-col w-full h-full'>
              <div className='flex justify-between items-start'>
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color='#fff' />
                </div>
                <BsInfoCircle fontSize={17} color='#fff' />

              </div>
              <div>
                {currentAccount && (
                  <p className='text-white font-medium text-sm pt-2 flex justify-start items-start'>
                {currentAccount.slice(0,10)}.....{currentAccount.slice(30,42)}
                </p>
                )}
                <p className='text-white font-semibold text-lg mt-1'>
                  Ethereum
                </p>
              </div>
            </div>
            

          </div>

        </div>
        <div className="p-5 mt-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <Input placeholder="Address To" name="addressTo"
          type="text" handleChange={handleChange}/>
          <Input placeholder="Amount (ETH)" name="amount"
          type="number" handleChange={handleChange}/>
          <Input placeholder="Keyword (GIF)" name="keyword"
          type="text" handleChange={handleChange}/>
          <Input placeholder="Enter Message" name="message"
          type="text" handleChange={handleChange}/>
          
        <div className='h-[1px] w-full bg-gray-400 mt-2' >
            
        </div>
          {isLoading() ? (
              <Loader/>
            ) : (
              <button
                type='button'
                onClick={handleSubmit}
                className='w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2546bd] text-white'>
                  Send Now
              </button>
            )}
        </div>
        


      </div>


    </div>
  )
}

export default Welcome