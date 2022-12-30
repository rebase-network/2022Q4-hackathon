import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { FansDAOABI } from '../ABIs';
import { getHistory, zip } from '../utils';
import { Web3Button } from "@thirdweb-dev/react";

const DAOdetails = () => {
  const { connect, address } = useStateContext()
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { contract, isLoading: isResolving } = useContract(contractAddress)
  // const { mutateAsync: joinDAO } = useContractWrite(contract, 'become_memeber');
  const [members, setMembers] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const contract = useContract(state.contractAddress)
  // const {contract} = useContract(state.contractAddress)
  // const {
  //   mutate: joinDAO,
  //   isLoading: isResolving,
  //   error,
  // } = useContractWrite(contract, "become_memeber");

  const sdk = new ThirdwebSDK("goerli");
  console.log(state);
  console.log(address);
  console.log(Number(state.creationTime._hex))
  const getMembers = async () => {
    console.log(state.contractAddress);
    const contract1 = await sdk.getContractFromAbi(state.contractAddress, FansDAOABI.abi);
    const members = await contract1.call('get_memebers')
    setIsLoading(false);
    console.log('zip', zip(members))
    console.log(members)
    return members
  }

  const getPromotions = async () => {
    console.log(state.contractAddress);
    const contract1 = await sdk.getContractFromAbi(state.contractAddress, FansDAOABI.abi);
    const promotions = await contract1.call('get_promotions')
    const parsedPromotions = promotions.map((promotion, i) => ({
      pId: i,
      NFTAddress: promotion.NFTAddress,
      NFTsymbol: promotion.NFTsymbol,
      consignor: promotion.consignor,
      promotionID: promotion.promotionID,
      royaltyPercent: promotion.royaltyPercent,
      powerThreshold: promotion.threshold,
      promotionCreationTime: promotion.promotionCreationTime,
      promotionLogo: promotion.promotionLogo,
      promotionName: promotion.promotionName,
      promotionStory: promotion.promotionStory
    })) //story
    setIsLoading(false);
    console.log(promotions)
    return parsedPromotions
  }

  const fetchMembers = async () => {
    setIsLoading(true);
    const data = await getMembers();
    setMembers(data);
    setIsLoading(false);
  }

  const fetchPromotions = async () => {
    setIsLoading(true);
    const data = await getPromotions();
    setPromotions(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMembers()
    fetchPromotions()
  }, [])

  // const handleJoin = async () => {
  //   if (!address) connect()
  //   else {

  //     // const signer = ethers.Wallet.createRandom();
  //     // const sdk = ThirdwebSDK.fromSigner(signer, "mainnet");
  //     const contract = await sdk.getContractFromAbi(state.contractAddress, FansDAOABI.abi);
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
          <img src={state.bannerDAO} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[10px]">
          <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[16px] text-white p-3 bg-[#0000b3] mbl rounded-t-[10px] w-full text-center truncate">{state.nameOfDAO}</h4>
            <p className="font-epilogue font-normal text-[16px] text-white mbl px-3 py-2 w-full rouned-b-[10px] text-center">{`Name`}</p>
          </div>
          <CountBox title="Total Members" value={members[0]?.length} />
          <CountBox className="text-[10px]" title="History" value={`${getHistory(Number(state.creationTime._hex))} Hours`} />
          <CountBox title="Promotions" value={promotions?.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={state.logoDAO} alt="user" className="object-contain rounded-full" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                {/* <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p> */}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] text-justify">{state.story}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase justify-between flex flex-row"><p>Members</p><p>Power</p></h4>

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
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Join</h4>

          <div className="mt-[20px] flex flex-col p-4 mbl rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-white font-bold">
              Join the DAO
            </p>
            <div className="mt-[0px]">
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px] mbl">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Find this interesting? Join Now!</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-white">You will be able to participate promotions hold by this DAO</p>
              </div>

              {/* <CustomButton 
                btnType="button"
                title=  {members.includes(address)?`You are a member!`:`Join ${state.nameOfDAO}`}
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleJoin}
                disabled={members.includes(address)}
              /> */}
              <Web3Button
                contractAddress={state.contractAddress}
                contractAbi={FansDAOABI.abi}
                className="font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#8c6dfd] mbl"
                accentColor={"#8c6dfd"}
                onSubmit={() => setIsLoading(true)}
                onSuccess={() => setIsLoading(false)}
                isDisabled={members[0]?.includes(address)}
                // Call the name of your smart contract function
                action={async (contract) => {
                  try {
                    const tx = await contract.call('become_memeber')
                    console.log(tx)
                    if (tx.receipt.status === 1) alert('Transaction Success')
                  } catch (e) {
                    alert(e)
                  }

                }}
              >
                {members[0]?.includes(address) ? `You are a member!` : `Join ${state.nameOfDAO}`}
              </Web3Button>
            </div>
          </div>

          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase mt-10 mb-5">Promotions</h4>
          <CustomButton
            btnType="button"
            title={`Look up for promotions`}
            styles="w-full bg-[#0000e6] mbl"
            handleClick={handleLookPromotions}
          />
        </div>



      </div>
    </div>
  )
}

export default DAOdetails