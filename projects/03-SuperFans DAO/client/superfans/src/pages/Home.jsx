import React, { useState, useEffect } from 'react'

import { DisplayDAOs } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [daos, setDAOs] = useState([]);

  const { address, contract, getDAOs } = useStateContext();

  const fetchDAOs = async () => {
    setIsLoading(true);
    const data = await getDAOs();
    setDAOs(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchDAOs();
  }, [address, contract]);

  return (
    <DisplayDAOs 
      title="All Fans DAOs"
      isLoading={isLoading}
      daos={daos}
    />
  )
}

export default Home