import React from 'react';
import { useNavigate } from 'react-router-dom';

import DAOCard from './DAOCard';
import { loader } from '../assets';


const DisplayDAOs = ({ title, isLoading, daos }) => {
  const navigate = useNavigate();

  console.log(daos)
  const handleNavigate = (dao) => {
    navigate(`/daos-details/${dao.id}`, { state: dao })
  }


  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({daos.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && daos.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No DAO appear yet
          </p>
        )}

        {!isLoading && daos.length > 0 && daos.map((dao) => <DAOCard 
          key={dao.id}
          {...dao}
          handleClick={() => handleNavigate(dao)}
        />)}
      </div>
    </div>
  )
}

export default DisplayDAOs