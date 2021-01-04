import React, { useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './redux/userSlice';
import { auth } from './firebase';
import Widgets from './components/Widgets';


function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // User is logged in.
        dispatch(
          login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }))
      }
      else {
        // User is logged out.
        dispatch(logout())
      }
    })
  }, [])
  
  return (
    <div className="app">
    {/* header */}
    <Header />

    {/* app body */}
    {!user ? (
      <Login/>
    ) : (
      <div className="app__body">
        <Sidebar/>
        <Feed/>
        <Widgets/>
      </div>
    )}
  </div>
  );
}

export default App;
