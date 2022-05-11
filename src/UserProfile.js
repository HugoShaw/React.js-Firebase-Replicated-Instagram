import React, { useEffect, useState } from 'react'
// import './post.css'
import Avatar from '@mui/material/Avatar'; // head image
import {storage,db,auth} from './App'
import firebase from 'firebase/compat/app';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import './profile.css'
import  Postprofile from './Postprofile';
import Followpart from './Followpart'


const Background = styled.div`
  width: 100%;
  height:100%;
  background: rgba(0,0,0,0.8);
  position:fixed;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const ProfileWrapper = styled.div`
  width:800px;
  height:500px;
  box-shadow: 0 5px 16px rgba(0,0,0,0.2);
  background: #fff;
  color: #000;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius:10px;
`;

const ProfileImg = styled.img`
  width:100%;
  height:100%;
  border-radius:10px 0 0 10px;
  background:#000;
`;

const ProfileContent = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  line-height:5;
  color:#141414;

  p {
    margin-bottom: 6rem;
  }

  button {
    padding:10px 24px;
    background:#141414;
    color:#fff;
    border:none;
  }
`;

const CloseProfileButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;



function UserProfile({openProfile, setOpenProfile,username,email,id}) {
const [post, setPost] =useState([]);
const [followname, setFollowname] =useState([]);



 //loop the post.
 useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').where("username", "==", username).onSnapshot(snapshot => {
    //every time a new post is added, this code run. Like a camera.
      setPost(snapshot.docs.map(doc => ({
       id:doc.id,
       post:doc.data()
      })));
   })
 },[]);
  //console.log(post)

  useEffect(() => {
    db.collection('follow').doc(id).collection('userfollow').onSnapshot(snapshot => {
    //every time a new post is added, this code run. Like a camera.
    setFollowname(snapshot.docs.map(doc => ({
       id:doc.id,
       name:doc.data().name,
       time:doc.data().time
      })));
   })
 },[]);

 
     
    
// const uid = auth.currentUser.uid;

  return (
    <>
      {openProfile ? (
        <Background>
          <ProfileWrapper openProfile={openProfile}>
            {/* <ProfileImg /> */}

            {/* <ProfileContent> */}
              <div className='namepart'>
                 <h1 className='hh1'>{username}</h1>
                 <h5 className='hh5'>{email}</h5>
              {/* <p>followers: </p>  */}
              </div>
              {
                  
      post.map(({id,post}) => (
        //reason why add a key is to refresh website just the new part
        
            <Postprofile  
            key={id}
        //  postId={id} 
        title={post.caption}
        image={post.imageUrl}/>
      ))

      }

      {
       followname.map(({name,time,id}) => (
          <Followpart 
          key={id}
          followname={name}
          timelist={time}
          
          />
        ))
      }

            <CloseProfileButton aria-label="Close" onClick={()=>setOpenProfile(prev => !prev)} />
          </ProfileWrapper>
        </Background>
      ) : null}
    </>
  );
}

export default UserProfile;