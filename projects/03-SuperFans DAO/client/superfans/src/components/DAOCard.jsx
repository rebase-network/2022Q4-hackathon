import React, {useEffect, useState} from 'react';
import {  avatar } from '../assets';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { FansDAOABI } from '../ABIs';

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
    const contract = await sdk.getContractFromAbi(contractAddress,FansDAOABI.abi);
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
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#8c1aff] cursor-pointer mbl" onClick={handleClick}>
      <img src={logoDAO} alt="logo" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-epilogue font-bold text-[25px] litext text-left leading-[26px] truncate mb-2">{nameOfDAO}</h3>
          <h4 className="font-epilogue font-semibold text-[14px] text-white leading-[22px]">Created by {ownerName}</h4>
          <p className="font-epilogue font-semibold text-[14px] text-white leading-[15px] mt-1">Members: {members.length}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[10px] gap-2">
          <div className="flex flex-col max-h-20 h-20 overflow-hidden">
          <p className="font-epilogue font-normal text-[#ffb399] text-left leading-[15px] flex-wrap text-xs">Story: {story}</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={avatar} alt="user" className="object-contain rounded-full"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#b2b3bd] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default DAOCard