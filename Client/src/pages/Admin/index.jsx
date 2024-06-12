import { Tabs } from "antd"
import React from 'react'
import Movies from './Movies'
import Artists from './Artists'
import Users from './Users'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Admin() {
    const [activeTab, setActiveTab] = React.useState("1")
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
   //Deny Access unless admin
    return (
        <div>
            {user?.isAdmin ? (
            <Tabs defaultActiveKey="1"
            activeKey={activeTab}
            onChange={(key)=>{
             setActiveTab(key);
             navigate(`/admin?tab${key}`);

            }}>

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






