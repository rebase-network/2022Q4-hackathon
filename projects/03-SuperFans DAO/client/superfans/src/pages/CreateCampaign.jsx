import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader, SelectField } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const { address, contract, getDAOs,createFansDAO } = useStateContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [buildDAOActive, setBuildDAOActive] = useState(true)
  const [form, setForm] = useState({
    name: '',
    daoname: '',
    story: '',
    logo: '',
    banner: '',
  });
  const [daos, setDAOs] = useState([]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
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

  const handleSubmit = async (e) => {
    if(!address)connect()
    e.preventDefault();

    checkIfImage(form.logo, async (exists1) => {
      checkIfImage(form.banner, async (exists2) =>{
      if(exists1 && exists2) {
        setIsLoading(true)
        await createFansDAO({ ...form})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid banner or logo image URL')
      }})
    })
  }

  const DAOForm = (
    <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
    <div className="flex flex-wrap gap-[40px]">
      <FormField 
        labelName="Your Name *"
        placeholder="John Doe"
        inputType="text"
        value={form.name}
        handleChange={(e) => handleFormFieldChange('name', e)}
      />
      <FormField 
        labelName="DAO Name *"
        placeholder="Write a title"
        inputType="text"
        value={form.title}
        handleChange={(e) => handleFormFieldChange('daoname', e)}
      />
    </div>

    <FormField 
        labelName="Story/Description *"
        placeholder="Write your story"
        isTextArea
        value={form.description}
        handleChange={(e) => handleFormFieldChange('story', e)}
      />
    <FormField 
        labelName="DAO logo image URL*"
        placeholder="Place image URL of your logo for the DAO"
        inputType="url"
        value={form.image}
        handleChange={(e) => handleFormFieldChange('logo', e)}
      />
      <FormField 
        labelName="DAO banner image URL*"
        placeholder="Place image URL of your banner for the DAO"
        inputType="url"
        value={form.image}
        handleChange={(e) => handleFormFieldChange('banner', e)}
      />

      <div className="flex justify-center items-center mt-[40px]">
        <CustomButton 
          btnType="submit"
          title="Create fans DAO"
          styles="bg-[#FFA044]"
        />
      </div>
  </form>
  )

  const PromotionForm = (
    <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
    <div className="flex flex-wrap gap-[40px]">
      <SelectField labelName="Choose a DAO to hold promotion*" selections={daos} handleChange={(e)=>handleFormFieldChange('daoid',e.id)}/>
      <FormField 
        labelName="Your Name *"
        placeholder="John Doe"
        inputType="text"
        value={form.name}
        handleChange={(e) => handleFormFieldChange('name', e)}
      />
      <FormField 
        labelName="DAO Name *"
        placeholder="Write a title"
        inputType="text"
        value={form.title}
        handleChange={(e) => handleFormFieldChange('daoname', e)}
      />
    </div>

    <FormField 
        labelName="Story/Description *"
        placeholder="Write your story"
        isTextArea
        value={form.description}
        handleChange={(e) => handleFormFieldChange('story', e)}
      />
    {/* <FormField 
        labelName="DAO logo image URL*"
        placeholder="Place image URL of your logo for the DAO"
        inputType="url"
        value={form.image}
        handleChange={(e) => handleFormFieldChange('logo', e)}
      />
      <FormField 
        labelName="DAO banner image URL*"
        placeholder="Place image URL of your banner for the DAO"
        inputType="url"
        value={form.image}
        handleChange={(e) => handleFormFieldChange('banner', e)}
      /> */}

      <div className="flex justify-center items-center mt-[40px]">
        <CustomButton 
          btnType="submit"
          title="Create fans DAO"
          styles="bg-[#FFA044]"
        />
      </div>
  </form>
  )

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className='flex flex-row gap-10'>
      <div className={`flex justify-center items-center p-[16px] sm:min-w-[380px] ${buildDAOActive?`bg-[#8c6dfd]`:`bg-[#3a3a43]`} rounded-[10px] gap-10`}>
        <button className={`font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] ${buildDAOActive? 'text-white':'text-gray'}`} onClick={()=>{setBuildDAOActive(!buildDAOActive)}}>Build your own fans DAO</button>
      </div>
      <div className={`flex justify-center items-center p-[16px] sm:min-w-[380px] ${buildDAOActive?`bg-[#3a3a43]`:`bg-[#8c6dfd]`} rounded-[10px] gap-10`}>
        <button className={`font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] ${buildDAOActive? 'text-gray':'text-white'}`} onClick={()=>{setBuildDAOActive(!buildDAOActive)}}>Start your promotion</button>
      </div>
      </div>
      {buildDAOActive? DAOForm: PromotionForm}
    </div>
  )
}

export default CreateCampaign