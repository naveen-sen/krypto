import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

import dummyData from '../utils/dummyData'
import useFetch from '../hooks/useFetch'

const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount,url})=>{
  const gifUrl = useFetch(typeof keyword === 'string' ? keyword : message)
  return (
    <div className='blue-glassmorphism m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    min-w-full
    flex-col p-3 rounded-md hover:shadow-2xl'>
      <div className='flex flex-col items-center w-full mt-3'>
        <div className=' w-full mb-6 p-2'>
          <a href={`https://etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
            <p className='text-white text-base'>From: {addressFrom.slice(0,10)}.....{addressFrom.slice(-6)}</p>
          </a>
          <a href={`https://etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
            <p className='text-white text-base pt-2'>To: {addressTo.slice(0,10)}.....{addressTo.slice(-6)}</p>
          </a>
          <p className='text-white text-base pt-1'>Amount: {amount} ETH</p>

          {message && (
            <>
              <br/>
              <p className='text-white text-base'>Message: {message}</p>
            </>
          )}

          <img src={gifUrl || url}
            alt='gif'
            className='w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover'
          />

          <div className='bg-black p-3 px-5 w-max rounded-3xl  shadow-2xl'>
            <p className='text-[#37c7da] text-sm font-bold'>{timestamp}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

const Transactions = () => {
  const {currentAccount,transactions} = useContext(TransactionContext)
  return (
    <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
      <div className='flex flex-col md:py-12 py-12 px-4'>
        {currentAccount ?(
          <h3 className='text-white text-3xl text-center my-2 font-extrabold'>Latest Transactions</h3>
        ):(
          <h3 className='text-white text-3xl text-center my-2 font-extrabold'>Connect your account to see the latest transactions</h3>
        
        )}
      <div className='flex flex-wrap justify-center items-center mt-10 sm:justify-start'>
          {currentAccount && [...transactions].reverse().map((transaction,index)=>{
            return <TransactionCard key={index} {...transaction}/>
          })}
      </div>
      </div>
      
    </div>
  )
}

export default Transactions