import React from 'react'

const formatAddress = (address) => {
  return address.substring(0,5) + '...' + address.substring(address.length-4)
}

export default formatAddress