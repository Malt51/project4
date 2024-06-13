import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


function indexHome() {
  const {user}= useSelector((state)=> state.users)
  return (
    <div>
    <h1 className='text-2xl font-semibold text-gray-600'>
      Welcome {user?.name}
    </h1>
    <Link to="/admin">
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Go to Add Movie & Artist
      </button>
    </Link>
  </div>
);
};


export default indexHome