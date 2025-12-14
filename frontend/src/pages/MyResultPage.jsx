import React from 'react'
import Navbar from '../components/Navbar'
import MyResult from '../components/MyResult'
import Footer from '../components/Footer'

const MyResultPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <MyResult />
      </div>
      <Footer />
    </div>
  )
}

export default MyResultPage
