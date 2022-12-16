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
    setPromotions(data);
    console.log(data)
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <DisplayPromotions 
      title="All Promotions"
      isLoading={isLoading}
      promotions={promotions}
    />
  )
}

export default Promotions