import { Tabs } from "antd"
import React from 'react'
import Movies from './Movies'
import Artists from './Artists'
import Users from './Users'
import { useSelector } from "react-redux"

function Admin() {
    const { user } = useSelector((state) => state.users);
   //Deny Access unless admin
    return (
        <div>
            {user?.isAdmin ? (
            <Tabs>

                <Tabs.TabPane tab="Movies" key="1">
                    <Movies />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Artists" key="2">
                    <Artists />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Users" key="3">
                    <Users />
                </Tabs.TabPane>
            </Tabs>
            ) : (
                <div>Access not Authorised </div>
            )}
        
        </div>

    );
}

export default Admin






