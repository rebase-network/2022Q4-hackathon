import React, { useState, useEffect } from 'react'

import { DisplayDAOs } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [daos, setDAOs] = useState([]);

  const { address, contract, getDAOs } = useStateContext();

  const fetchDAOs = async () => {
    setIsLoading(true);
    const data = await getDAOs();
    const filteredData = data.filter((dao) => dao.owner === address);
    setDAOs(filteredData);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchDAOs();
  }, [address, contract]);

  return (
    <DisplayDAOs 
      title="DAO found by you"
      isLoading={isLoading}
      daos={daos}
    />
  )
}

export default Profile