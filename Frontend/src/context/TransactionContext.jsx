import React, { useEffect, useState } from 'react'
import { BrowserProvider, Contract, parseEther,formatEther } from 'ethers';
import {contractABI , contractAddress} from '../utils/constants'
import { createContext } from 'react'
import { toast } from 'react-toastify';

export const TransactionContext = createContext()

const {ethereum} = window;

const getEthereumContract = async ()=>{
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const transactionContract = new Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({children}) => {

    const [currentAccount,setCurrentAccount] = useState("")
    const [formData,setFormData] = useState({addressTo:"",amount:"",keyword:"",message:""})
    const [loading,setLoading] = useState(false)
    const [transactionCount,setTransactionCount] = useState(localStorage.getItem("transactionCount"))
    const [transactions,setTransactions] = useState([])

    const handleChange = (e,name)=>{
        setFormData((prevState)=>({
            ...prevState,
            [name]:e.target.value
        }))
    }

    const getAllTransactions = async ()=>{
        try{
            const transactionContract = await getEthereumContract()
            const transactions = await transactionContract.getAllTransactions()

            const structuredTransactions = transactions.map((transaction)=>({
                addressTo:transaction.receiver,
                addressFrom:transaction.sender,
                timestamp:new Date(Number(transaction.timestamp)*1000).toLocaleString(),
                message:transaction.keyword,
                amount: formatEther(transaction.amount)

            }))

            setTransactions(structuredTransactions)

            
        }
        catch(error){
            console.log(error)
        }
        
    }

    const checkWalletIsConnected = async ()=>{
        try{
            if(!ethereum) return toast.warning("Install Metamask to connect")

        const account = await ethereum.request({method:"eth_accounts"});
        
        if(account.length){
            setCurrentAccount(account[0])

        getAllTransactions()


        }else{
            
        }
        }
        catch(error){
            toast.error("No Wallet Found")

        }
        
    }

    const connectWallet = async ()=>{
        try{
            if(!ethereum) return toast.warn("Install Metamask to connect")
            
            const account = await ethereum.request({method:"eth_requestAccounts"})

        setCurrentAccount(account[0])
        toast.success("Wallet Connected")
        }catch(error){
            toast.error("Failed to connect wallet")
            throw new Error("No ethereum object")
        }
        }

const sendTransaction = async ()=>{
        try{
            if(!ethereum) return toast.warn("Please Install Metamask")
            
            const {addressTo,amount,keyword,message} = formData

            const transactionContract = await getEthereumContract()
            const parsedAmount = parseEther(amount)

            await ethereum.request({
                method:"eth_sendTransaction",
                params:[{
                    from:currentAccount,
                    to:addressTo,
                    gas:"0x5208",  //21000 Gwei
                    value:parsedAmount._hex
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)

            setLoading(true);
            await transactionHash.wait();
            setLoading(false);
            toast.success("Transaction successful")

            const transactionCount = await transactionContract.getTransactionCount()

            setTransactionCount(Number(transactionCount))

        }catch(error){
            toast.error("Transaction Failed")
            throw new Error("No ethereum object")
        }
    }

    const checkTransactionExist = async()=>{
        try{
            const transactionContract = await getEthereumContract()
            const transactionCount = await transactionContract.getTransactionCount()

            window.localStorage.setItem("transactionCount",transactionCount)
        }catch(error){
            throw new Error("No ethereum object")
        }
    }
    

    useEffect(()=>{
        checkWalletIsConnected();
    },[])
  return (
    <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,transactions, keyword: formData.keyword, loading, setLoading}}>
        {children}
    </TransactionContext.Provider>
  )
}
