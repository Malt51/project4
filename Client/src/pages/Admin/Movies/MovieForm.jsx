import { Button, Form, message, Select, Tabs } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { antValidationError } from '../../../helpers'
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { GetAllArtist } from '../../../apis/artists';
import { AddMovie, GetMovieById, UpdateMovie } from '../../../apis/movies';
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';


function MovieForm() {
    const [artists = [], setArtists] = useState([]);
    const [movie, setMovie] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();


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

    const getMovie = async (id) => {
        try {
            dispatch(SetLoading(true));
            const response = await GetMovieById(id);
            if (response.data) {
                const movieData = response.data;
                movieData.releaseDate = moment(movieData.releaseDate).format("YYYY-MM-DD");
                movieData.cast = movieData.cast?.map((artist) => artist._id) || [];
                movieData.hero = movieData.hero?._id || null;
                movieData.heroine = movieData.heroine?._id || null;
                movieData.director = movieData.director?._id || null;
                setMovie(movieData);
            } else {
                setMovie(null);
            }
            dispatch(SetLoading(false));
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoading(false));
        }
    };



    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true));
            let response;
            if (params?.id) {
              response = await UpdateMovie(params.id, values);
            } else {
              response = await AddMovie(values);
            }
            message.success(response.message);
            dispatch(SetLoading(false));
            navigate("/admin");

        } catch (error) {
            dispatch(SetLoading(false))
            message.error(error.message)
        }
    }



    useEffect(() => {
        getArtists();
    }, []);

    useEffect(() => {
        if (params?.id) {
            getMovie(params.id);
        }

    }, [])



    return (
        (movie || !params.id) && (
            <div>
                <h1 className='text-gray-600 text-xl font-semibold'>
                    {params?.id ? "Edit Movie Detail" : "Add New Movie"}
                </h1>
                <Tabs>
                    <Tabs.TabPane tab="Details" key="1">
                        <Form layout="vertical" className='flex flex-col gap-5'
                            onFinish={onFinish}
                            initialValues={movie}>
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
                                    <Select options={artists} showSearch />
                                </Form.Item>

                                <Form.Item label="Director" name="director"
                                    rules={antValidationError}>
                                    <Select options={artists} showSearch />
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
                                            label: "Japanese",
                                            value: "japanese",
                                        },

                                        {
                                            label: "French",
                                            value: "french",
                                        },


                                    ]} />
                                </Form.Item>

                                <Form.Item label="Trailer" name="trailer"
                                    rules={antValidationError}>
                                    {/* <Select options={artists} /> */}
                                    <input type="text" />
                                </Form.Item>

                            </div>


                            <Form.Item label="Cast & Crew" name="cast">

                                <Select options={artists} mode="tags" />
                            </Form.Item>

                            <div className="flex justify-end gap 5">
                                <Button
                                    onClick={() => {
                                        navigate("/admin")
                                    }}
                                >Cancel</Button>
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
    )

}

export default MovieForm