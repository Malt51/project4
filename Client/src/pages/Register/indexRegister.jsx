import React, { useEffect } from 'react';
import { Button, Form,message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apis/users';
import { antValidationError } from '../../helpers';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../redux/loadersSlice';

function indexRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    try {
      dispatch(SetLoading(true));
      const response = await RegisterUser(values);
      dispatch(SetLoading(false));
      message.success(response.message);
      navigate("/login");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }

  }, []);


  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary flex flex-col items-center justify-center">
       <div>

        <h1 className="text-5xl text-yellow-600 font-semibold">
          Welcome to Mad Movie Collection
        </h1>
        <span className='text-md text-gray-300 mt-2'>
          Store your favorite Movie Collection
        </span>
       </div>

      </div>
         
      <div className='flex items-center justify-center'>
        <div className='w-[500px]' >
          <h1 className="text-2xl mb-2">Register Your Account</h1>
          <hr />


          <Form
            layout="vertical"
            className='flex flex-col gap-5 mt-3'
            onFinish={onFinish}>
            
            <Form.Item
              label="Name"
              name="name"
              rules={antValidationError}>
              <input />
            </Form.Item>


            <Form.Item
              label="Email"
              name="email"
              rules={antValidationError}>
              <input />
            </Form.Item>

            <Form.Item label="Password" name="password"
            rules={antValidationError}>
              <input type="password" />
            </Form.Item>

            <div className="flex flex-col gap-5">
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>

              <Link to="/login" >
                Already Have a Account? Login Here!

              </Link>
              </div>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default indexRegister