import React, { useState, useEffect } from 'react'

import { DisplayPromotions } from '../components';
import { useStateContext } from '../context'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { FansDAOABI } from '../ABIs';
import { useLocation, useNavigate } from 'react-router-dom';

const Promotions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const { state } = useLocation();
  const sdk = new ThirdwebSDK("goerli");
  

  const fetchPromotions = async () => {
    setIsLoading(true);
    const contract = await sdk.getContractFromAbi(state.contractAddress, FansDAOABI.abi);
    const data = await contract.call('get_promotions');
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
    setPromotions(parsedPromotions);
    console.log(parsedPromotions)
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <DisplayPromotions 
      title={`Promotions of ${state.nameOfDAO}`}
      isLoading={isLoading}
      promotions={promotions}
    />
  )
}

export default Promotions