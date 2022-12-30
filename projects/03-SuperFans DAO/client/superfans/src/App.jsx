import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { DAOdetails, CreateDAO, Home, Profile, Promotions, AllPromotions, PromotionDetails } from './pages';

const App = () => {
  return (
    <div className="relative linear-gradient-bg sm:-8 p-4 min-h-screen flex flex-row linear-gradient-bg">
      <div className="sm:flex hidden mr-5 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full mx-auto max-w-[1280px] sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-dao" element={<CreateDAO />} />
          <Route path="/daos-details/:id/" element={<DAOdetails />} />
          {/* <Route path="/create-promotion" element={<CreatePromotion />} /> */}
          <Route path="/promotions-details/:id/:id" element={<PromotionDetails />} />
          <Route path="promotions/:id" element={<Promotions />} />
          <Route path="promotions/" element={<AllPromotions />} />
        </Routes>
      </div>
    </div>
  )
}

export default App