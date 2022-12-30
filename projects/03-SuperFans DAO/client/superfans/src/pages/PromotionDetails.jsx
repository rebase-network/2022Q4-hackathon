import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PromotionABI } from '../ABIs';
import { getHistory, zip } from '../utils';
import { Web3Button } from "@thirdweb-dev/react";

const PromotionDetails = () => {
  const { connect, address } = useStateContext()
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { contract, isLoading: isResolving } = useContract(NFTAddress)
  // const { mutateAsync: joinDAO } = useContractWrite(contract, 'become_memeber');
  const [totalSupply, setTotalSupply] = useState();
  // const {{contract}} = useContract(state.NFTAddress)
  // const {contract} = useContract()
  // const {
  //   mutate: joinDAO,
  //   isLoading: isResolving,
  //   error,
  // } = useContractWrite(contract, "become_memeber");

  const getTotalSupply = async () => {
    setIsLoading(true)
    console.log(state.NFTAddress);
    const contract = await sdk.getContractFromAbi(state.NFTAddress, PromotionABI.abi);
    const totalSupply = await contract.call('totalSupply');
    console.log(totalSupply)
    setIsLoading(false);
    setTotalSupply(totalSupply)
  }



  const sdk = new ThirdwebSDK("goerli");
  console.log(state);
  console.log(address);
  console.log(Number(state.promotionCreationTime._hex))

  const metadata = {
    name: state.promotionName,
    description: state.promotionStory,
    image: state.promotionLogo, 
    attributes: [
      {
        "trait_type": "Owner", 
        "value": address
      }, 
      {
        "trait_type": "Promotor", 
        "value": state.DAOOwner
      },
      {
        "trait_type": "DAO_name", 
        "value": state.daoName
      },
    
    ]
  };


  // const getMembers = async () => {
  //   console.log(state.NFTAddress);
  //   const contract1 = await sdk.getContractFromAbi(state.NFTAddress, FansDAOABI.abi);
  //   const members = await contract1.call('get_memebers')
  //   setIsLoading(false);
  //   console.log('zip', zip(members))
  //   console.log(members)
  //   return members
  // }

  // const getPromotions = async () => {
  //   console.log(state.NFTAddress);
  //   const contract1 = await sdk.getContractFromAbi(state.NFTAddress, FansDAOABI.abi);
  //   const promotions = await contract1.call('get_promotions')
  //   const parsedPromotions = promotions.map((promotion, i) => ({
  //     pId: i,
  //     NFTAddress:promotion.NFTAddress,
  //     NFTsymbol:promotion.NFTsymbol,
  //     consignor:promotion.consignor,
  //     promotionID: promotion.promotionID,
  //     royaltyPercent: promotion.royaltyPercent,
  //     powerThreshold:promotion.threshold,
  //     promotionpromotionCreationTime:promotion.promotionpromotionCreationTime,
  //     promotionLogo: promotion.promotionLogo,
  //     promotionName: promotion.promotionName,
  //     promotionStory: promotion.promotionStory
  //   })) //story
  //   setIsLoading(false);
  //   console.log(promotions)
  //   return parsedPromotions
  // }

  // const fetchMembers = async () => {
  //   setIsLoading(true);
  //   const data = await getMembers();
  //   setMembers(data);
  //   setIsLoading(false);
  // }

  // const fetchPromotions = async () => {
  //   setIsLoading(true);
  //   const data = await getPromotions();
  //   setPromotions(data);
  //   setIsLoading(false);
  // }

  useEffect(() => {
    getTotalSupply()
  }, [])

  // const handleJoin = async () => {
  //   if (!address) connect()
  //   else {

  //     // const signer = ethers.Wallet.createRandom();
  //     // const sdk = ThirdwebSDK.fromSigner(signer, "mainnet");
  //     const contract = await sdk.getContractFromAbi(state.NFTAddress, FansDAOABI.abi);
  //     await contract.call('become_memeber')
  //     await joinDAO();
  //     // navigate('/')

  //   }
  // }

  const handleLookPromotions = () => {
    navigate(`/promotions/${Number(state.id._hex)}`, { state: state })
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.promotionLogo} alt="promotionlogo" className="w-full h-[410px] rounded-xl" />
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-center gap-[10px] h-[410px]">
          <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[16px] text-white p-3 bg-[#0000b3] mbl rounded-t-[10px] w-full text-center truncate">{state.promotionName}</h4>
            <p className="font-epilogue font-normal text-[16px] text-white mbl px-3 py-2 w-full rouned-b-[10px] text-center">{`Name`}</p>
          </div>
          <CountBox title="Symbol" value={state.NFTsymbol} />
          <CountBox title="Total Mints" value={Number(totalSupply?._hex)??0} />
          <CountBox className="text-[10px]" title="History" value={`${getHistory(Number(state.promotionCreationTime._hex))} Hours`} />
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-center gap-[10px] h-[410px]">
        <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[16px] text-white p-3 bg-[#0000b3] mbl rounded-t-[10px] w-full text-center truncate">{state.daoName}</h4>
            <p className="font-epilogue font-normal text-[16px] text-white mbl px-3 py-2 w-full rouned-b-[10px] text-center">{`DAO Name`}</p>
          </div>
          <CountBox title="Power Threshold" value={Number(state.powerThreshold?._hex)??0} />
          <CountBox className="text-[10px]" title="Royalty Percentage" value={`${(Number(state.royaltyPercent?._hex))}%`} />
          </div>
      </div>


      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Promotor</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={state.logoDAO} alt="user" className="object-contain rounded-full" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.DAOOwner}</h4>
                {/* <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p> */}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] text-justify">{state.promotionStory}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">NFT Address</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] text-justify">{state.NFTAddress}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Consignor</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] text-justify">{state.consignor}</p>
            </div>
          </div>

          {/* <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase justify-between flex flex-row"><p>Members</p>{members?.length>0 && <p>Power</p>}</h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {members?.length > 0 ? members[0]?.map((item, index) => (
                <div key={`${item[0]}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] break-ll">{index + 1}. {item.toString()}</p>
                  <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] break-ll">{members[1][index]?.toNumber()}</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No other members yet. Be the first one!</p>
              )}
            </div>
          </div> */}
        </div>


        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Mint</h4>

          <div className="mt-[20px] flex flex-col p-4 mbl rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-white fiont-bold">
              Mint this NFT
            </p>
            <div className="mt-[0px]">
              <div className="my-[20px] p-4 bg-[#13131a] mbl rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">This is a community promotion that does not charge any money</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-white">You will only cost some gas to mint an NFT here</p>
              </div>

              <Web3Button
                contractAddress={state.NFTAddress}
                contractAbi={PromotionABI.abi}
                className="font-epilogue mbl font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#8c6dfd]"
                accentColor={"#8c6dfd"}
                onSubmit={() => setIsLoading(true)}
                onSuccess={() => setIsLoading(false)}
                // Call the name of your smart contract function
                action={async (contract) => {
                  try{
                    const tx = await contract.erc721.mintTo(address, metadata);
                    console.log(tx)
                    if(tx.receipt.status===1)alert('Transaction Success')
                  }catch(e){
                    alert(e)
                  }
                  
                }}
              >
                {`Mint NFT`}
              </Web3Button>
            </div>
          </div>

        </div>



      </div>
    </div>
  )
}

export default PromotionDetails