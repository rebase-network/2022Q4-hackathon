import React, {useEffect, useState} from 'react';
import { tagType, avatar } from '../assets';
import { useStateContext } from '../context'
import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const DAOCard = ({ id, creationTime,contractAddress, owner, ownerName, nameOfDAO, story,logoDAO,bannerDA0, handleClick }) => {
  // const remainingDays = daysLeft(deadline);
  const sdk = new ThirdwebSDK("goerli");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);

  // const { getDAOContract } = useStateContext();
  // const [contractAddress, setContractAddress] = useState();


  // const fetchContract = async () => {
  //   setIsLoading(true);
  //   const data = await getDAOContract(id);
  //   setContractAddress(data);
  //   setIsLoading(false);
  // }

  const getMembers = async () =>{
    const contract = await sdk.getContract(contractAddress);
    const members = await contract.call('get_memebers')
    console.log('members',members)
    return members[0]
  }

  const fetchMembers = async () => {
    setIsLoading(true);
    const data = await getMembers();
    setMembers(data);
    setIsLoading(false);
  }

  useEffect(()=>{
    fetchMembers()
  },[])
  
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#8c1aff] cursor-pointer" onClick={handleClick}>
      <img src={logoDAO} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">
        {/* <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
        </div> */}

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{nameOfDAO}</h3>
          <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">Created by {ownerName}</h4>
          <p className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[15px]">Members:{members.length}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[10px] gap-2">
          <div className="flex flex-col max-h-20 overflow-hidden">
          <p className="font-epilogue font-normal text-[#ffb399] text-left leading-[15px] flex-wrap text-xs">{story}</p>

          </div>
          {/* <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{creationTime}</h4>
          </div> */}
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={avatar} alt="user" className="object-contain rounded-full"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default DAOCard