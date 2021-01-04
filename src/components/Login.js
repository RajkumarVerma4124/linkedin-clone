import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/userSlice'
import { auth } from '../firebase'
import '../styles/Login.css'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const dispatch = useDispatch()
    const loginToApp = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoURL: userAuth.user.photoURL
            }))
        })
        .catch((err) => alert(err.message))
    }
    const register = () => {
        if (!name) {
            return alert("You must enter a full name!")
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic
            })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic
                }))
            })
        }).catch((err) => alert(err.message))
    }
    return (
        <div className="login">
            <img src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-700x394.png" alt="" />
            <form>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name (required if registering)" type="text"/>
                <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder="Profile Pic URL (optional)" type="text"/>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="text"/>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"/>
                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>
            <p>Not a member?{" "}
                <span className="login__register" onClick={register}>Register Now</span>
            </p>
        </div>
    )
}

export default Login
