import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import '../styles/Sidebar.css'

function Sidebar() {
    const user = useSelector(selectUser)

    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            <p>{ topic }</p>
        </div>
    );

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/05/Gradient-Overview-Blog-Image-2.jpg?w=1024&h=500" alt=""/>
                <Avatar src={user.photoUrl} className="sidebar__avatar">
                    {/* Might as well give them a default avatar
                    whic is the first letter of their name if they
                    don't specify a photo url */}
                    {user.email[0]}
                </Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>
            
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <p>Who viewed you</p>
                    <p className="sidebar__statNumber">3,456</p>
                </div>
                <div className="sidebar__stat">
                    <p>Views on post</p>
                    <p className="sidebar__statNumber">1,211</p>
                </div>
            </div>

            <div className="sidebar__bottom">
                <p>Recent</p>
                { recentItem("ReactJS") }
                { recentItem("NodeJS") }
                { recentItem("Angular") }
                { recentItem("MongoDB") }
            </div>
            
        </div>
    )
}

export default Sidebar
