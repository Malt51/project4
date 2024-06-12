import React from 'react'
import { Button } from "antd"
import { useNavigate } from 'react-router-dom'


function Movies() {
const navigate = useNavigate();

  return (
    <div>
      <div className='flex justify-end'>
        <Button onClick={()=>{
          navigate("/admin/movies/add")
        }}
        >Add Movie</Button>

      </div>
    </div>
  )
}

export default Movies