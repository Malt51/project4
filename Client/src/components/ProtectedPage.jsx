import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apis/users';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { SetLoading } from "../redux/loadersSlice"

function ProtectedPage({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      dispatch(SetUser(response.data));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");

    } else {
      getCurrentUser();
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center bg-primary p-5">
        <span className='font-semibold text-yellow-500 text-2xl cursor-pointer'
          onClick={() => navigate("/")}>Mad Movie Collection</span>

        <div className='bg-white rounded px-5 py-2 flex gap-2 items-center'>
          <i className="ri-user-line"></i>
          <span className='text-primary text-sm cursor-pointer underline'
            onClick={() => navigate("/profile")}
          >{user?.name}</span>
          <i className="ri-logout-circle-r-line ml-6"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }
            }

          ></i>

        </div>


      </div>

      {user && <div className='p-5'>
        {children}
      </div>}

    </div>
  );
}

export default ProtectedPage