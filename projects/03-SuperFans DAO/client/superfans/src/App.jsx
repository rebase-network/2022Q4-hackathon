import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { DAOdetails, CreateCampaign, Home, Profile, Promotions } from './pages';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 linear-gradient-bg min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-dao" element={<CreateCampaign />} />
          <Route path="/daos-details/:id" element={<DAOdetails />} />
          {/* <Route path="/create-promotion" element={<CreatePromotion />} /> */}
          <Route path="promotions/:id" element={<Promotions />} />
        </Routes>
      </div>
    </div>
  )
}

export default App