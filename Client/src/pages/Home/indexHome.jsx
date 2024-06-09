import React from 'react'
import { useSelector } from 'react-redux'

function indexHome() {
  const {user}= useSelector((state)=> state.users)
  return (
    <div>
    <h1 className='text-2xl font-semibold text-gray-600'>
      Welcome {user?.name}

    </h1>



    </div>
  )
}

export default indexHome