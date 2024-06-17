import { Modal, Form, Input, message, Tabs, Upload, Button } from 'antd'
import { antValidationError } from '../../../helpers';
import { useDispatch } from "react-redux"
import { AddArtist, UpdateArtist } from '../../../apis/artists';
import { SetLoading } from '../../../redux/loadersSlice';
import moment from 'moment';
import { useState } from "react";
import { UploadImage } from '../../../apis/image';

function ArtistForm({ showArtistForm, setShowArtistForm, selectedArtist, reloadData }) {
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = useState("1");
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    if (selectedArtist) {
        selectedArtist.dob = moment(selectedArtist.dob).format("YYYY-MM-DD");
      }
    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true));
            let response;
            if (selectedArtist) {
                response = await UpdateArtist(selectedArtist._id, values);
            } else {
                response = await AddArtist(values);
            }
            reloadData();
            dispatch(SetLoading(false));
            message.success(response.message);
            setShowArtistForm(false);
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoading(false));
        }
    }


    const imageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("image", file);
            dispatch(SetLoading(true));
            const response = await UploadImage(formData);
            dispatch(SetLoading(false));

        } catch (error) {
            message.error(error.message)
            dispatch(SetLoading(false))

        }

    }


    return (
        <Modal
            open={showArtistForm}
            onCancel={() => setShowArtistForm(false)}
            title=""
            centered
            width={700}
            okText={selectedArtist ? "Update" : "Add "}
            onOk={() => {
                if (selectedTab === "1") {
                    form.submit()
                } else {
                    imageUpload();
                }

            }}>

            <>
                <div className='h1 text-center font-semibold text-gray-600 text-xl uppercase'>
                    {selectedArtist ? "Edit.Artist" : "Add Artist"}
                </div>

                <Tabs
                    defaultActiveKey='1'
                    onChange={(key) => setSelectedTab(key)}

                >
                    <Tabs.TabPane tab="Basic Info" key="1">
                        <Form layout="vertical" className='flex flex-col gap-5'
                            onFinish={onFinish}
                            form={form} initialValues={selectedArtist}>


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
                                        <option value="Cinemotograpgy">Cinemotography</option>
                                        <option value="Editor">Editor</option>

                                    </select>
                                </Form.Item>

                                <Form.Item label="DebutMovie" name="debutMovie"
                                    rules={antValidationError}>
                                    <Input type="text" />
                                </Form.Item>
                            </div>

                            <Form.Item label="BIO" name="bio"
                                rules={antValidationError}>
                                <Input.TextArea />
                            </Form.Item>

                            <Form.Item label="Profile Pic" name="profilePic"
                                rules={antValidationError}>
                                <Input type="text" />
                            </Form.Item>

                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Images" key="2"
                        disabled={!selectedArtist}>
                        <Upload
                            //  fileList={[file]}
                            onChange={(info) => {
                                setFile(info.file);
                            }}

                            beforeUpload={() => false}
                            listType='picture'
                        >

                            <Button>Click to upload</Button>
                        </Upload>



                    </Tabs.TabPane>
                </Tabs>
            </>
        </Modal>
    )
}

export default ArtistForm