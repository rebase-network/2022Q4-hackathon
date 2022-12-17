import React, { useState } from 'react'
import { CustomButton } from './';
import { logo, menu, search, avatar } from '../assets';


const SelectField = ({ labelName, handleChange, selections }) => {
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [isActive, setIsActive] = useState('-');
    console.log('s',selections)
    return (
        <label className="flex-1 flex flex-col relative">
            {labelName && (
                <span className="font-epilogue font-medium text-[15px] leading-[22px] text-white mb-[10px]">{labelName}</span>
            )}

            <div className="content-center justify-between justify-items-center flex flex-row py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
            ><p className='self-center'>{isActive?.nameOfDAO??'-'}</p>
                <img
                src={menu}
                alt="menu"
                className="w-[22px] h-[22px] object-contain cursor-pointer self-end grayscale"
                onClick={() => setToggleDrawer((prev) => !prev)}
            />
            </div>


            <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] mbl z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[150vh]' : 'translate-y-5'} transition-all duration-700`}>
                <ul className="mb-4">
                    {selections.map((link) => (
                        <li
                            key={link.nameOfDAO}
                            className={`flex p-4 ${Number(isActive?.id?._hex) === Number(link?.id?._hex) && 'bg-[#000066] mbl'}`}
                            onClick={() => {
                                setIsActive(link);
                                setToggleDrawer(false);
                                handleChange(link);
                            }}
                        >
                            <img
                                src={link.logoDAO}
                                alt={link.nameOfDAO}
                                className={`w-[24px] h-[24px] object-contain ${Number(isActive?.id?._hex) === Number(link?.id?._hex) ? 'grayscale-0' : 'grayscale'}`}
                            />
                            <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${Number(isActive?.id?._hex) === Number(link?.id?._hex) ? 'text-[#FFA044]' : 'text-white'}`}>
                                {link.nameOfDAO}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </label>
    )
}

export default SelectField























