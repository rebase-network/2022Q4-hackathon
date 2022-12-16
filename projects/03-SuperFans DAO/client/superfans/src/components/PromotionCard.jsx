import React from 'react';

import { avatar } from '../assets';

const PromotionCard = ({  handleClick }) => {
//promotionID, promotionCreationTime, NFTAddress, consignor, royaltyPercent, promotionLogo, threshold,NFTsymbol,threshold,
  
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#8c1aff] cursor-pointer" onClick={handleClick}>
      <img src={promotionLogo} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">
        {/* <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
        </div> */}

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{}</h3>
          <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">Created by {}</h4>
        </div>

        <div className="flex justify-between flex-wrap mt-[10px] gap-2">
          <div className="flex flex-col">
          <p className="font-epilogue font-normal text-[#ffb399] text-left leading-[18px] truncate">{}</p>

          </div>
          {/* <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{creationTime}</h4>
          </div> */}
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={avatar} alt="user" className="object-contain rounded-full"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{}</span></p>
        </div>
      </div>
    </div>
  )
}

export default PromotionCard