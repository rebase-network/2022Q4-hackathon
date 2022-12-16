import React, { useContext, createContext, useState } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x57F029A41dc76914d9bFBFCF1522D64964550AEE');
  const { mutateAsync: createFansDAO } = useContractWrite(contract, 'createFansDAOContract');
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const createDAO = async (form) => {
    try {
      const data = await createFansDAO([
        form.name, // title
        form.story, // description
        form.daoname,
        form.logo,
        form.banner
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getDAOs = async () => {
    const daos = await contract.call('get_DAOs');
    console.log('daos',daos)
    const parsedDAOs = daos.map((dao, i) => ({
      creationTime: dao.creationTime,
      contractAddress: dao.contractAddress,
      owner: dao.owner,
      ownerName: dao.ownerName,
      nameOfDAO: dao.nameOfDAO,
      story: dao.story,
      logoDAO: dao.logoDAO,
      bannerDAO: dao.bannerDA0,
      id: dao.id,
      pId: i,
    }));

    return parsedDAOs;
  }

  const getUserDAOs = async () => {
    const allDAOs = await getDAOs();
    const filteredDAOs = allDAOs.filter((dao) => dao.owner === address);
    return filteredDAOs;
  }

  // const getMembers = async (DAOcontractAdd) =>{
  //   const members = await DAOcontract.call('get_memebers')
  //   return members
  // }

  const getDAOContract = async (id)=> {
    const allDAOs = await getDAOs();
    const filteredDAOs = allDAOs.filter((dao) => dao.id._hex  === id._hex);
    return filteredDAOs[0].contractAddress;
  }

  // const becomeMember = async (DAOcontractAdd) =>{
  //   console.log('join,..')
  //   try{
  //     await joinDAO();
  //   }catch (error) {
  //       console.log("contract call failure", error)
  //     }
  //   console.log('joined')
  // }

  // const getDonations = async (pId) => {
  //   const donations = await contract.call('getDonators', pId);
  //   const numberOfDonations = donations[0].length;

  //   const parsedDonations = [];

  //   for(let i = 0; i < numberOfDonations; i++) {
  //     parsedDonations.push({
  //       donator: donations[0][i],
  //       donation: ethers.utils.formatEther(donations[1][i].toString())
  //     })
  //   }

  //   return parsedDonations;
  // }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createFansDAO: createDAO,
        getDAOs,
        getUserDAOs,
        disconnect,
        // getMembers,
        // joinDAO: becomeMember,
        getDAOContract
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);