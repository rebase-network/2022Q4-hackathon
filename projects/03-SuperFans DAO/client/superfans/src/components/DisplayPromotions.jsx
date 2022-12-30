import React from 'react';
import { useNavigate } from 'react-router-dom';

import PromotionCard from './PromotionCard';
import { loader } from '../assets';


const DisplayPromotions = ({ title, isLoading, promotions}) => {
  const navigate = useNavigate();

  console.log(promotions)
  const handleNavigate = (promotion) => {
    navigate(`/promotions-details/${promotion.daoID}/${promotion.promotionID}`, { state: promotion })
  }


  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({promotions.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && promotions.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No promotion appear yet
          </p>
        )}

        {!isLoading && promotions.length > 0 && promotions.map((promotion) => <PromotionCard 
          key={promotion.promotionID}
          {...promotion}
          handleClick={() => handleNavigate(promotion)}
        />)}
      </div>
    </div>
  )
}

export default DisplayPromotions