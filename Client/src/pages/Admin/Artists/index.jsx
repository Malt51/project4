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
      dataIndex: "debutyear",
    },

    {
      title: "Profession",
      dataIndex: "profession",
    },

    {
      title:"Debut Movie",
      dataIndex: "debutMove",
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



// function Artists() {
//   const [artists, setArtists] = useState([]);
//   const dispatch = useDispatch();
//   const [showArtistModal, setShowArtistModal] = useState(false);
//   //variable for selected artist for edit
//   const [selectedArtist, setSelectedArtist] = useState(null);
//   const fetchAllArtists = async () => {
//     try {
//       dispatch(SetLoading(true));
//       const response = await GetAllArtist();
//       setArtists(response.data);
//       dispatch(SetLoading(false));
//     } catch (error) {
//       message.error(error.message);
//       dispatch(SetLoading(false));
//     }
//   };

//   //Delete artist
//   const deleteArtist= async(id)=>{
//     try {
//       dispatch(SetLoading(true));
//       const response = await DeleteArtist(id);
//       message.success(response.message)
//       fetchAllArtists();
//       dispatch(SetLoading(false));
//     } catch (error) {
//       message.error(error.message);
//       dispatch(SetLoading(false));
//     }

//   }

//   const columns = [
//     {
//       title: "Artist",
//       dataIndex: "profilePic",
//       render: (text, record) => {
//         console.log("record",record)
//         const imageUrl=record?.images?.[0] || ""
//         console.log("imge",imageUrl)
//                 return (
//           <img className="w-20 h-20 rounded" src={imageUrl} alt="" />
//         );
//       },
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "DOB",
//       dataIndex: "dob",
//       render: (text) => {
//         return getDateFormat(text);
//       },
//     },
//     {
//       title: "Debut  Year",
//       dataIndex: "debutYear",
//     },
//     {
//       title: "Profession",
//       dataIndex: "profession",
//     },
//     {
//       title: "Debut Movie",
//       dataIndex: "debutMovie",
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: (text, record) => {
//         return (
//           <div className="flex gap-5">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//               onClick={() => {
//                 setSelectedArtist(record);
//                 setShowArtistModal(true);
//               }}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
//               />
//             </svg>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//               onClick={()=>{
//                 deleteArtist(record._id)
//               }}
              
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//               />
//             </svg>
//           </div>
//         );
//       },
//     },
//   ];
//   useEffect(() => {
//     fetchAllArtists();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <div>
//       <div className=" flex justify-end mr-5">
//         <Button
//           onClick={() => {
//             setSelectedArtist(null)
//             setShowArtistModal(true);
//           }}
//         >
//           Add Artist
//         </Button>
//       </div>
//       <Table dataSource={artists} columns={columns} className="m-5"></Table>
//       {showArtistModal && (
//         <ArtistForm
//           showArtistModal={showArtistModal}
//           setShowArtistModal={setShowArtistModal}
//           selectedArtist={selectedArtist}
//           reloadData={fetchAllArtists}
//         />
//       )}
//     </div>
//   );
// }
// Artists.propTypes = {
//   selectedArtist:  PropTypes.string.isRequired,
// };

// export default Artists;
