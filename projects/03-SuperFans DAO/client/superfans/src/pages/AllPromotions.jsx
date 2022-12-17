import React, { useState, useEffect } from 'react'

import { DisplayPromotions } from '../components';
import { useStateContext } from '../context'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { FansDAOABI } from '../ABIs';
import { useLocation, useNavigate } from 'react-router-dom';

const AllPromotions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [promotions, setPromotions] = useState([]);
  // const { state } = useLocation();
  const { address, contract, getDAOs,createFansDAO } = useStateContext();
  const sdk = new ThirdwebSDK("goerli");
  
  const fetchDAOs = async () => {
    setIsLoading(true);
    const data = await getDAOs();
    // console.log('data',data)
    await data.map((item)=>{
      setIsLoading(true);
      fetchPromotions(item.contractAddress)
      setIsLoading(false);
    })
  }

  useEffect(() => {
    if(contract) fetchDAOs();
  }, [contract]);

  const fetchPromotions = async (contractAddress) => {
    setIsLoading(true);
    const contract = await sdk.getContractFromAbi(contractAddress, FansDAOABI.abi);
    const data = await contract.call('get_promotions');


    if(data.length>0){
      setIsLoading(true);
      const parsedPromotions = data.map((promotion, i) => ({
        pId: i,
        NFTAddress:promotion.NFTAddress,
        NFTsymbol:promotion.NFTsymbol,
        consignor:promotion.consignor,
        promotionID: promotion.promotionID,
        royaltyPercent: promotion.royaltyPercent,
        powerThreshold:promotion.threshold,
        promotionCreationTime:promotion.promotionCreationTime,
        promotionLogo: promotion.promotionLogo,
        promotionName: promotion.promotionName,
        promotionStory: promotion.promotionStory
      })) //story
      const DAOOwner =  await contract.call('ownerName');
      const logoDAO =  await contract.call('logo');
      const daoID =  await contract.call('id');
      const daoName =  await contract.call('name');
      for(let i=0;i<parsedPromotions.length;i++){
        parsedPromotions[i]['DAOOwner']= DAOOwner;
        parsedPromotions[i]['logoDAO']=logoDAO;
        parsedPromotions[i]['daoID']=daoID;
        parsedPromotions[i]['daoName']=daoName;
      }
      console.log('d',data)
      // const con = [...promotions, ...parsedPromotions]
      setPromotions((state) => [...state, ...parsedPromotions]);
      console.log('pro',promotions)
      // console.log('con',con)
    }
    setIsLoading(false);
  }

  return (
    <DisplayPromotions 
      title={`All Promotions`}
      isLoading={isLoading}
      promotions={promotions}
      // DAOOwner={state.ownerName}
      // logoDAO={state.logoDAO}
    />
  )
}

export default AllPromotions