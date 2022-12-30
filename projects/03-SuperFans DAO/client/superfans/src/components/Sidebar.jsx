import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../assets';
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const LogoIcon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`h-[52px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="h-[52px] rounded-[10px] object-fill" />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`h-[52px] rounded-[10px] object-fill ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[45vh]">
      <Link to="/">
        <LogoIcon styles="w-[200px]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center sdbar rounded-[20px] w-[100px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <div className='text-center justify-center items-center flex flex-col'>
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
            <div className='text-white text-xs capitalize'>{link.name}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Sidebar