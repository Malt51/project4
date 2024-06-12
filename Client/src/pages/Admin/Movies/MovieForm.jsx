import { Button, Form, Select, Tabs } from 'antd'
import React from 'react'
import { antValidationError } from '../../../helpers'

function MovieForm() {

    const tempOptions = [
        {
            value: "1",
            label: "1",
        },

        {
            value: "2",
            label: "2",
        },


        {
            value: "3",
            label: "3",
        },


    ];






    return (
        <div>
            <h1 className='text-gray-600 text-xl font-semibold'>
                Add Movies
            </h1>
            <Tabs>
                <Tabs.TabPane tab="Details" key="1">
                    <Form layout="vertical" className='flex flex-col gap-5'>
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
                                <Select options={tempOptions} />
                            </Form.Item>

                            <Form.Item label="Heroine" name="heroine"
                                rules={antValidationError}>
                                <Select options={tempOptions} />
                            </Form.Item>

                            <Form.Item label="Director" name="director"
                                rules={antValidationError}>
                                <Select options={tempOptions} />
                            </Form.Item>








                        </div>

                        <div className='grid grid-cols-3 gap-5'>
                            <Form.Item label="Genre" name="genre"
                                rules={antValidationError}>
                                <Select options={tempOptions} />
                            </Form.Item>

                            <Form.Item label="Language" name="language"
                                rules={antValidationError}>
                                <Select options={tempOptions} />
                            </Form.Item>

                            <Form.Item label="Trailer" name="trailer"
                                rules={antValidationError}>
                                <Select options={tempOptions} />
                            </Form.Item>

                        </div>


                        <Form.Item label="Cast & Crew" name="cast">

                            <Select options={tempOptions} />
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