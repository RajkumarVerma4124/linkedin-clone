import React, { useRef, useEffect, useState } from 'react'
import '../styles/Feed.css'
import CreateIcon from "@material-ui/icons/Create"
import ImageIcon from "@material-ui/icons/Image"
import SubscriptionsIcon from "@material-ui/icons/Subscriptions"
import EventNoteIcon from "@material-ui/icons/EventNote"
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay"
import InputOption from './InputOption'
import Post from './Post'
import { db, storage } from '../firebase'
import firebase from "firebase"
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/userSlice'
import FlipMove from "react-flip-move"
import { useCollection } from 'react-firebase-hooks/firestore';


function Feed() {
    const user = useSelector(selectUser)
    const [input, setInput] = useState("")
    const [posts, setPosts] = useState([])
    const inputRef = useRef(null);
    const filepickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);

    useEffect(() => {
        db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => (
            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))      
    }, [])

    const [realtimePosts] = useCollection(
        db.collection('posts').orderBy('timestamp', 'desc')
    )

    const sendPost = (e) => {
        e.preventDefault()

        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(doc => {
            if (imageToPost) {
                const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageToPost,
                    'data_url')

                removeImage();

                uploadTask.on('state_change', null, error => console.log(error),
                    () => {
                        // When the upload complete
                        storage.ref('posts').child(doc.id).getDownloadURL().then(url => {
                            db.collection('posts').doc(doc.id).set({
                                postImage: url
                            }, { merge: true })
                        })
                    })
            }
        })

        setInput("");
    };


    const addImageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result)
        }
    };

    const removeImage = () => {
        setImageToPost(null);
    }

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon/>
                    <form>
                        <input placeholder={`What's on your mind, ${user.displayName}...?`} value={input} ref={inputRef} onChange={e => setInput(e.target.value)} type="text"/>
                        <button type='submit' onClick={sendPost}>Send</button>
                    </form>
                    {imageToPost && (
                        <div onClick={removeImage} className='image_Picker'>
                            <img src={imageToPost} alt="" />
                            <p>Remove</p>
                        </div>
                    )}
                </div>
                <div className="feed__inputOptions">
                    <div onClick={() => filepickerRef.current.click()} className='inputIcon'>
                        <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                        <input ref={filepickerRef} type="file" onChange={addImageToPost} hidden />
                    </div>
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E"/>
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD"/>
                    <InputOption Icon={CalendarViewDayIcon} title="Write Article" color="#7FC15E"/>
                </div>
            </div>
            <FlipMove>
                {
                    realtimePosts ?
                        realtimePosts?.docs.map((post) => (
                            <Post
                                key={post.id}
                                name={post.data().name}
                                description={post.data().description}
                                message={post.data().message}
                                photoUrl={post.data().photoUrl}
                                postImage={post.data().postImage}
                                timestamp={post.data().timestamp}

                            />
                        )) : (

                            posts.map(({ id, data: { name, description, message, photoUrl, postImage, timestamp } }) => (
                            <Post
                                key={id}
                                name={name}
                                description={description}
                                message={message}
                                photoUrl={photoUrl}
                                postImage={postImage}
                                timestamp={timestamp}
                            />
                        )
                        )
                        )}
            </FlipMove>
        </div>
    )
}

export default Feed
