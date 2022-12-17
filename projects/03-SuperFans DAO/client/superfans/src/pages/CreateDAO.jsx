import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CustomButton, FormField, Loader, SelectField } from '../components';
import { checkIfImage } from '../utils';
import { Web3Button } from "@thirdweb-dev/react";
import { FansDAOABI } from '../ABIs';

const createDAO = () => {
  const { address, contract, getDAOs,createFansDAO } = useStateContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [buildDAOActive, setBuildDAOActive] = useState(true)
  const [DAOContractAddress, setDAOContractAddress] = useState()
  const [DAOForm, setDAOForm] = useState({
    name: '',
    daoname: '',
    story: '',
    logo: '',
    banner: '',
  });
  const [PromotionForm, setPromotionForm] = useState({
    daoid: '',
    promotionname: '',
    consignor: '',
    story: '',
    threshold: '',
    royalty: '',
    logo: '',
    symbol: '',
  });
  const [daos, setDAOs] = useState([]);

  const handleDAOFormFieldChange = (fieldName, e) => {
    console.log('DAO',e.target.value)
    setDAOForm({ ...DAOForm, [fieldName]: e.target.value })
  }

  const handlePromotionFormFieldChange = (fieldName, e) => {
    console.log('PM',e.target.value)
    setPromotionForm({ ...PromotionForm, [fieldName]: e.target.value })
  }

  const handlePromotionFormSeletionChange = (fieldName, e) => {
    setIsLoading(true)
    const filteredDAOs = daos.filter((dao) => dao.id._hex  === e._hex);
    setDAOContractAddress(filteredDAOs[0].contractAddress);
    console.log(filteredDAOs[0].contractAddress)
    setIsLoading(false);
    setPromotionForm({ ...PromotionForm, [fieldName]: e })
  }

  useEffect(() => {
    if(contract) fetchDAOs();
  }, [address, contract]);


  const fetchDAOs = async () => {
    setIsLoading(true);
    const data = await getDAOs();
    setDAOs(data);
    setIsLoading(false);
  }

  const handleDAOSubmit = async (e) => {
    if(!address){connect()}
    else{
    e.preventDefault();
    checkIfImage(DAOForm.logo, async (exists1) => {
      checkIfImage(DAOForm.banner, async (exists2) =>{
      if(exists1 && exists2) {
        try{
        setIsLoading(true)
        await createFansDAO({ ...DAOForm})
        setIsLoading(false);
        navigate('/');
        }catch(e){
          alert(e)
        }
      } else {
        alert('Provide valid banner or logo image URL')
      }})
    })
  }
  }

  const handlePromotionSubmit = async (e) => {
    if(!address)connect()
    }

  const DAOFormFields = (
    <form onSubmit={handleDAOSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
    <div className="flex flex-wrap gap-[40px]">
      <FormField 
        labelName="Your Name *"
        placeholder="Jupiter"
        inputType="text"
        value={DAOForm.name}
        handleChange={(e) => handleDAOFormFieldChange('name', e)}
      />
      <FormField 
        labelName="DAO Name *"
        placeholder="Write the name of your DAO"
        inputType="text"
        value={DAOForm.title}
        handleChange={(e) => handleDAOFormFieldChange('daoname', e)}
      />
    </div>

    <FormField 
        labelName="Story/Description *"
        placeholder="Write the story about your DAO"
        isTextArea
        value={DAOForm.description}
        handleChange={(e) => handleDAOFormFieldChange('story', e)}
      />
    <FormField 
        labelName="DAO logo image URL*"
        placeholder="Place image URL of your logo for the DAO"
        inputType="url"
        value={DAOForm.image}
        handleChange={(e) => handleDAOFormFieldChange('logo', e)}
      />
      <FormField 
        labelName="DAO banner image URL*"
        placeholder="Place image URL of your banner for the DAO"
        inputType="url"
        value={DAOForm.image}
        handleChange={(e) => handleDAOFormFieldChange('banner', e)}
      />

      <div className="flex justify-center items-center mt-[40px]">
        <CustomButton 
          btnType="submit"
          title="Create Your Fans DAO"
          styles="bg-[#000066] mbl"
        />
      </div>
  </form>
  )

  const PromotionFormFields = (
    <form onSubmit={handlePromotionSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
    <div className="flex flex-wrap gap-[40px]">
      <SelectField labelName="Choose a DAO to hold promotion*" selections={daos} handleChange={(e)=>{handlePromotionFormSeletionChange('daoid',e.id);console.log(e)}}/>
      <FormField 
        labelName="Promotion Name *"
        placeholder="NFT party"
        inputType="text"
        value={PromotionForm.name}
        handleChange={(e) => handlePromotionFormFieldChange('promotionname', e)}
      />
      <FormField 
        labelName="Consignor/Owner Address*"
        placeholder="0x"
        inputType="text"
        value={PromotionForm.title}
        handleChange={(e) => handlePromotionFormFieldChange('consignor', e)}
      />
    </div>

    <FormField 
        labelName="Story *"
        placeholder="Write the story about the NFT collection or promotion"
        isTextArea
        value={PromotionForm.description}
        handleChange={(e) => handlePromotionFormFieldChange('story', e)}
      />
      <FormField 
        labelName="Percent of Royalty*"
        placeholder="The percentage of Royalty that transfer an NFT would incur"
        inputType="number"
        value={PromotionForm.image}
        handleChange={(e) => handlePromotionFormFieldChange('royalty', e)}
      />
    <FormField 
        labelName="Power threshold*"
        placeholder="The power threshold for members to join this promotion and mint NFT"
        inputType="number"
        value={PromotionForm.image}
        handleChange={(e) => handlePromotionFormFieldChange('threshold', e)}
      />
      <FormField 
        labelName="Promotion Logo/NFT base image*"
        placeholder="Place image URL of your Logo/NFT base image for the promotion"
        inputType="url"
        value={PromotionForm.image}
        handleChange={(e) => handlePromotionFormFieldChange('logo', e)}
      />
      <FormField 
        labelName="NFT symbol*"
        placeholder="ETH"
        inputType="text"
        value={PromotionForm.image}
        handleChange={(e) => handlePromotionFormFieldChange('symbol', e)}
      />

      <div className="flex justify-center items-center mt-[40px]">
          <Web3Button
                contractAddress={DAOContractAddress}
                contractAbi={FansDAOABI.abi}
                className="font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#8c6dfd] mbl"
                accentColor={"#8c6dfd"}
                onSubmit={()=>setIsLoading(true)}
                onSuccess={() => setIsLoading(false)}
                // Call the name of your smart contract function
                action={(contract) => { 
                checkIfImage(PromotionForm.logo, async (exists) => {
                if(exists){
                setIsLoading(true);
                try{
                console.log(PromotionForm)
                const tx = await contract.call('create_promotion', PromotionForm.consignor,PromotionForm.royalty,PromotionForm.logo,PromotionForm.threshold, PromotionForm.promotionname, PromotionForm.symbol, PromotionForm.story);
                console.log(tx)
                if(tx.receipt.status===1)alert('Transaction Success')
                }catch(e){
                  alert(e)
                  setIsLoading(false);
                }
                setIsLoading(false);
              }
                else{alert('Provide valid banner or logo image URL')}
            })}} //story
              >
                Create promotion
          </Web3Button>
        {/* <CustomButton 
          btnType="submit"
          title="Create promotion"
          styles="bg-[#FFA044]"
        /> */}
      </div>
  </form>
  )

  return (
    <div className="mbl flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className='flex flex-row gap-10'>
      <div className={`flex justify-center items-center p-[16px] sm:min-w-[380px] ${buildDAOActive?`bg-[#0000ff] mbl`:`bg-[#3a3a45] mbl`} rounded-[10px] gap-10`}>
        <button className={`font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] ${buildDAOActive? 'text-white':'text-gray'}`} onClick={()=>{setBuildDAOActive(!buildDAOActive)}}>Build your own fans DAO</button>
      </div>
      <div className={`flex justify-center items-center p-[16px] sm:min-w-[380px] ${buildDAOActive?`bg-[#3a3a45] mbl`:`bg-[#0000ff] mbl`} rounded-[10px] gap-10`}>
        <button className={`font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] ${buildDAOActive? 'text-gray':'text-white'}`} onClick={()=>{setBuildDAOActive(!buildDAOActive)}}>Start your promotion</button>
      </div>
      </div>
      {buildDAOActive? DAOFormFields: PromotionFormFields}
    </div>
  )
}

export default createDAO