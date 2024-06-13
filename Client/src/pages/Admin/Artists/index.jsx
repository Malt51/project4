import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, message, Table } from 'antd';
import ArtistForm from './ArtistForm';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { GetAllArtist } from '../../../apis/artists';
import { useEffect, useState } from "react";
import { getDateFormat, getDateTimeFormat } from "../../../helpers";
import PropTypes from 'prop-types';
import { DeleteArtist} from "../../../apis/artists";


function Artists() {
  const [artists, setArtists] = React.useState([]);
  const dispatch = useDispatch();
  const [showArtistForm, setShowArtistForm] = React.useState(false);
  const navigate = useNavigate();
  const[selectedArtist, setSelectedArtist] = React.useState(null);

 
  const fetchArtists = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllArtist();
      setArtists(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

//Delete Artist
const deleteArtist= async(id)=>{
  try {
    dispatch(SetLoading(true));
    const response = await DeleteArtist(id);
    message.success(response.message)
    fetchArtists();
    dispatch(SetLoading(false));
  } catch (error) {
    message.error(error.message);
    dispatch(SetLoading(false));
  }

}

  const columns = [
    {
      title: "Artist",
      dataIndex: "profilePicture",
      render: (text, record) => {
        return (
          <img src={record?.profilePic}
            alt=""
            className='w-10 h-10 rounded-full' />
        )
      }
    },
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "DOB",
      dataIndex: "dob",
      render : (text, record) =>{
        return getDateFormat(text)
      }
    },

    {
      title: "Debut Year",
      dataIndex: "debutYear",
    },

    {
      title: "Profession",
      dataIndex: "profession",
    },

    {
      title:"Debut Movie",
      dataIndex: "debutMovie",
    },

    {
      title:"Action",
      dataIndex: "action",
      render : (text, record) =>{
        return (<div className='flex gap-5'>
          <i className="ri-delete-bin-fill"
          onClick={()=>{deleteArtist(record._id)

          }}
          ></i>
          <i className="ri-edit-line" onClick={()=>{
            setSelectedArtist(record);
            setShowArtistForm(true);
            
          }}
          ></i>
          


        </div>
        )
      }
    }
  ]

  React.useEffect(() => {
    fetchArtists();
  }, []);




  return (
    <div>
      <div className='flex justify-end'>
        <Button onClick={() => {
          setSelectedArtist(null);
          setShowArtistForm(true);
      
        }}>Add Artist</Button>
      </div>

      <Table dataSource={artists} columns={columns}/>

      {showArtistForm && (
        <ArtistForm
          showArtistForm={showArtistForm}
          setShowArtistForm={setShowArtistForm} 
          selectedArtist = {selectedArtist}
          reloadData = {fetchArtists}
          />
      )}

    </div>
  )
}

export default Artists



