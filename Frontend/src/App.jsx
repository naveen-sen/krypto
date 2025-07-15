import React from 'react';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Services from './components/Services';
import Transactions from './components/Transactions';
import Footer from './components/Footer';
import Loader from './components/Loader';
import {toast,ToastContainer} from 'react-toastify'

function App() {

  return (
    <>
      <div className='min-h-screen'>
        <div className='gradient-bg-welcome'>
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <Transactions />
        <Footer />
        <ToastContainer position='top-center'/>
      </div>
    </>
  )
}

export default App
