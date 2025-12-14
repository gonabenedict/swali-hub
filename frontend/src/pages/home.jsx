import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/sidebar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Sidebar />
      </div>
      <Footer />
    </div>
  )
}

export default Home
