import React from 'react';
import { Button,Form } from "antd";
import { Link } from 'react-router-dom';

function indexLogin() {
  const onFinish = (values)=>{
    console.log("Great",values);
  }

  
  
  
  
  return (
    <div className='grid grid-cols-2 h-screen'>
      <div className='bg-primary'></div>
      <div className='flex items-center justify-center'>
        <div className='w-[400px]' >
          <h1 className="text-2xl mb-2">Login To Your Account</h1>
          <hr/>
          

          <Form
            layout="vertical"
            className='flex flex-col gap-5 mt-3'
            onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email">
              <input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <input />
            </Form.Item>
          
          <div className="flex flex-col gap-5">
          <Button type ="primary" htmlType = "submit" block>
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