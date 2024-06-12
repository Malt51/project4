import { Button, Form, message, Select, Tabs } from 'antd'
import React from 'react'
import { antValidationError } from '../../../helpers'
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { GetAllArtist } from '../../../apis/artists';

function MovieForm() {
    const [artists = [], setArtists] = React.useState([]);
    const dispatch = useDispatch();


    const getArtists = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await GetAllArtist();
            setArtists(response.data.map((artist) => ({
                value: artist._id,
                label: artist.name,


            })));
            dispatch(SetLoading(false));
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoading(false));
        }
    };

    const onFinish = (values) =>{
        console.log(values)
    }

    React.useEffect(() => {
        getArtists();
    }, []);

    return (
        <div>
            <h1 className='text-gray-600 text-xl font-semibold'>
                Add Movies
            </h1>
            <Tabs>
                <Tabs.TabPane tab="Details" key="1">
                    <Form layout="vertical" className='flex flex-col gap-5'
                    onFinish = {onFinish}>
                        <div className='grid grid-cols-3 gap-5'>
                            <Form.Item label="Name" name="name"
                                rules={antValidationError}
                                className='col-span-2'>

                                <input />
                            </Form.Item>
                            <Form.Item label="Release Date"
                                name="releaseDate"
                                rules={antValidationError}>
                                <input type="date" />
                            </Form.Item>



                        </div>
                        <Form.Item label="Plot" name="plot"
                            rules={antValidationError}>
                            <textarea />
                        </Form.Item>

                        <div className='grid grid-cols-3 gap-5'>
                            <Form.Item label="Hero" name="hero"
                                rules={antValidationError}>
                                <Select options={artists} showSearch />
                            </Form.Item>

                            <Form.Item label="Heroine" name="heroine"
                                rules={antValidationError}>
                                <Select options={artists} />
                            </Form.Item>

                            <Form.Item label="Director" name="director"
                                rules={antValidationError}>
                                <Select options={artists} />
                            </Form.Item>








                        </div>

                        <div className='grid grid-cols-3 gap-5'>
                            <Form.Item label="Genre" name="genre"
                                rules={antValidationError}>
                                <Select options={[
                                    {
                                        label: "Action",
                                        value: "action",
                                    },

                                    {
                                        label: "Comedy",
                                        value: "comedy",
                                    },

                                    {
                                        label: "Drama",
                                        value: "drama",
                                    },

                                    {
                                        label: "Horror",
                                        value: "horror",
                                    },

                                    {
                                        label: "Romance",
                                        value: "romance",
                                    },




                                ]} />
                            </Form.Item>

                            <Form.Item label="Language" name="language"
                                rules={antValidationError}>
                                <Select options={[

                                    {
                                        label: "English",
                                        value: "english",
                                    },

                                    {
                                        label : "Japanese",
                                        value : "japanese",
                                     },
    
                                     {
                                        label : "French",
                                        value : "french",
                                     },


                                ]} />
                            </Form.Item>

                            <Form.Item label="Trailer" name="trailer"
                                rules={antValidationError}>
                                <Select options={artists} />
                            </Form.Item>

                        </div>


                        <Form.Item label="Cast & Crew" name="cast">

                            <Select options={artists} mode = "tags" />
                        </Form.Item>

                        <div className="flex justify-end gap 5">
                            <Button>Cancel</Button>
                            <Button htmlType='submit' type='primary'>
                                Save
                            </Button>
                        </div>








                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Posters" key="2"></Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default MovieForm