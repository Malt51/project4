import React, { useEffect } from 'react';
import { Button, Form, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apis/users';
import { antValidationError } from '../../helpers';

function indexLogin() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      localStorage.setItem("token", response.data);
      message.success(response.message);
      navigate("/");
    } catch (error) {
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
            Welcome to Mad Gaming Review
          </h1>
          <span className='text-md text-gray-300 mt-2'>
            Daily Gaming Review,Ratings and recommendation
          </span>
        </div>



      </div>

      <div className='flex items-center justify-center'>
        <div className='w-[500px]' >
          <h1 className="text-2xl mb-2">Login To Your Account</h1>
          <hr />


          <Form
            layout="vertical"
            className='flex flex-col gap-5 mt-3'
            onFinish={onFinish}>

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
                Login
              </Button>

              <Link to="/register" >
                Sign Up For New Account

              </Link>
            </div>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default indexLogin