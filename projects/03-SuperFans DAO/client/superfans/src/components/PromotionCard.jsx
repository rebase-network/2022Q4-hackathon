import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PromotionABI } from '../ABIs';

const PromotionCard = ({ promotionID, promotionName, promotionStory, promotionCreationTime, NFTAddress, consignor, royaltyPercent, promotionLogo, threshold, NFTsymbol, powerThreshold, handleClick, DAOOwner, logoDAO, daoName }) => {
  // const { contract, isLoading: isResolving } = useContract(NFTAddress)
  // const { mutateAsync: joinDAO } = useContractWrite(contract, 'become_memeber');
  const [totalSupply, setTotalSupply] = useState();
  const sdk = new ThirdwebSDK("goerli");
  // const {{contract}} = useContract(state.NFTAddress)
  // const {contract} = useContract()
  // const {
  //   mutate: joinDAO,
  //   isLoading: isResolving,
  //   error,
  // } = useContractWrite(contract, "become_memeber");

  useEffect(() => {
    getTotalSupply()
  }, [])

  const getTotalSupply = async () => {
    const contract = await sdk.getContractFromAbi(NFTAddress, PromotionABI.abi);
    const totalSupply = await contract.call('totalSupply');
    console.log(totalSupply)
    setTotalSupply(totalSupply)
  }

  console.log(logoDAO);
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#8c1aff] cursor-pointer mbl" onClick={handleClick}>
      <img src={promotionLogo} alt="logo" className="w-full h-[288px] object-cover rounded-[15px]" />

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[25px] litext text-left leading-[26px] truncate mb-2">{promotionName === '' ? 'Name' : promotionName}</h3>
          <h3 className="font-epilogue font-semibold text-[14px] text-white text-left leading-[22px] truncate">Symbol: {NFTsymbol === '' ? 'SYB' : NFTsymbol}</h3>
          <p className="font-epilogue font-semibold text-[14px] text-white leading-[15px] mt-1">Mints: {Number(totalSupply?._hex)??0}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[10px] gap-2">
          <div className="flex flex-col max-h-20 h-20">
            <p className="font-epilogue font-normal text-[#ffb399] text-left leading-[18px] flex flex-wrap overflow-hidden text-xs">Story: {promotionStory}</p>
          </div>
          {/* <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{creationTime}</h4>
          </div> */}
          <h4 className="font-epilogue font-semibold text-[12px] text-[#b2b3bd] leading-[22px] truncate">Owned by {consignor}</h4>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={logoDAO} alt="user" className="object-contain rounded-full" />
          </div>
          <h3 className="flex-1 font-epilogue font-normal text-[16px] text-white truncate">Promoted by <span className="litext font-semibold">{DAOOwner}</span></h3>
        </div>
      </div>
    </div>
  )
}

export default PromotionCard