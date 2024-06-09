import React from 'react'
import { Modal, Form, Input } from 'antd'
import { antValidationError } from '../../../helpers';

function ArtistForm({ showArtistForm, setShowArtistForm }) {
   const [form] = Form.useForm();
   const onFinish = (values) =>{
    console.log(values);
   }
   
    return (
        <Modal
            open={showArtistForm}
            onCancel={() => setShowArtistForm(false)}
            title="Add Artist"
            centered
            width={700}
            okText="Add"
            onOk={()=>{
                form.submit();
                
            }}>


            <Form layout="vertical" className='flex flex-col gap-5'
            onFinish={onFinish}
            form={form}>
                <Form.Item label="Name" name='name'
                rules={antValidationError}>
                    <Input />
                </Form.Item>
                <div className='grid grid-cols-2 gap-5'>
                    <Form.Item label="DOB" name="dob"
                     rules={antValidationError}>
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item label="Debut Year" name="debutYear"
                     rules={antValidationError}>
                        <Input type="number" />
                    </Form.Item>
                </div>


                <div className='grid grid-cols-2 gap-5'>
                    <Form.Item label="Profession" name="profession"
                     rules={antValidationError}>
                        <select name="" id="">
                            <option value="">Select</option>
                            <option value="Actor">Actor</option>
                            <option value="Actress">Actress</option>
                            <option value="Director">Director</option>
                            <option value="Producer">Producer</option>
                            <option value="Music Director">Music Director</option>
                            <option value="Singer">Singer</option>
                            <option value="Lyrist">Lyrist</option>
                            <option value="Cinemotograpgy">Cinemotography</option>
                            <option value="Editor">Editor</option>

                        </select>
                    </Form.Item>

                    <Form.Item label="Debut Movie" name="debutMovie"
                     rules={antValidationError}>
                        <Input type="text" />
                    </Form.Item>
                </div>

                <Form.Item label="Bio" name="bio"
                 rules={antValidationError}>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item label="Profile Pic" name="profilePic"
                 rules={antValidationError}>
                    <Input type="text" />
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ArtistForm