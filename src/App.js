import React,{useState,useRef, useEffect,Component} from 'react'
import './App.css';
import  Post from './Post';
import UserProfile from './UserProfile';
import  'firebase/compat/firestore';
import 'firebase/compat/auth';
import {getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import ImageUpload from './ImageUpload';

import Box from '@mui/material/Box';
import {Button,Input} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const firebaseConfig = {
    apiKey: "AIzaSyCE2d0tknsb44yF8Zy99Pf7ZOkiGgI6188",
         authDomain: "cse503-e7678.firebaseapp.com",
         databaseURL:"https:cse503-e7678.firebaseio.com",
         projectId: "cse503-e7678",
         storageBucket: "cse503-e7678.appspot.com",
         messagingSenderId: "171746433448",
         appId: "1:171746433448:web:992f12e20296af4da6259d"
};

// Use this to initialize the firebase App
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
// const storage = firebase.storage();
const storage = getStorage();
 

export {storage,db,auth};

function App() {
  // const classes = useStyles();
  const [post, setPost] =useState([]);
  const [open, setOpen] =useState(false);
  const [opensign, setOpensign] =useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] =useState('');
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const [currentuser, setUser] =useState();
  const [ok, setOk] =useState([]);

  

 
  


  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //user login
        console.log(authUser);
        setUser(authUser);

      }else {
        //user log out
        setUser(null);
      }
    })

    return ()=>{
      unsubscribe();
    }
  },[currentuser, username])

   //loop the post.
  useEffect(() => {
     db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
     //every time a new post is added, this code run. Like a camera.
       setPost(snapshot.docs.map(doc => ({
        id:doc.id,
        post:doc.data(),
        //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
       })));
    })
  },[]);
  
  
  //function signup
  const Signup = (e)=>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
        email:email
      })

      // firebase
      //     .firestore()
      //     .collection("users")
      //     .doc(firebase.auth().currentUser.uid)
      //     .set({
      //       name:username,
      //       email:email
      //     });
          
    })
    .catch((error) => alert(error.message))
    setOpen(false)

 }
//  console.log(auth.user.displayName)




//function signout
 const Signout =()=>{
  console.log('log out')
   auth.signOut();

 }

 //outbox signin
 const SignIn =(e)=>{
   setOpensign(true)
  //  e.preventDefault();
  //   console.log(firebase.auth().currentUser.uid)
  }

  //inbox signin
  const Signin =(e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))
    //close the signin window
    setOpensign(false);
  }

    // show a user profile card window
    const OpenProfileWindow = () => {
      setOpenProfile(prev => !prev);
    }

  //window style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    
    <div className="Apps">
      
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form className='signup'>
             <center>
               <img className ='signupimg' src="https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png"/>
              </center> 

              <Input 
              type="text"
              placeholder='please type your username'
               value={username}
              
              onChange={(e) => setUsername(e.target.value)}
              />

              <Input 
              type="text"
              placeholder='please type your email'
              value={email}
              
              onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
              type="password"
              placeholder='please type your password'
              value={password}
              

              onChange={(e) => setPassword(e.target.value)}
              />
              
                  <Button type="submit" onClick={Signup}>Signup</Button>
              </form>
          </Typography>
          </Box>
      </Modal>

      {/* signin box window */}
      <Modal
        open={opensign}
        onClose={setOpensign}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form className='signup'>
             <center>
               <img className ='signupimg' src="https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png"/>
              </center> 


              <Input 
              type="text"
              placeholder='please type your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
              type="password"
              placeholder='please type your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              
                  <Button type="submit" onClick={Signin}>Sign in</Button>
              </form>

          </Typography>
          
          </Box>
      </Modal>

      {currentuser?.displayName &&(
       
       <UserProfile openProfile = {openProfile} setOpenProfile = {setOpenProfile} username={currentuser.displayName} email={currentuser.email} id={currentuser.uid}/>
   ) }

     {/* header image */}
     <div className="app_header"> 
        <img className="header_img" src="https://acadinfo.wustl.edu/WSHome/images/logo-washu-rd.gif" alt="" /> 
        {/* judge if there is a user currently */}
     {currentuser ? (
       <div>
       {/* logged in user can open his/her profile and see the posts and personal info */}
       <Button onClick={OpenProfileWindow}>User Profile</Button>
       <Button onClick={Signout}>Logout</Button>
     </div>
     ):(
       <div>
         <Button onClick={SignIn}>Sign in</Button>
          <Button onClick={handleOpen}>Sign up</Button>
       </div>
     )}
     
     </div>

     




     {/* body part */}
     <div className='fileup'>
       <h1>Welcom to our web!</h1>
       {currentuser?.displayName ? (
        <ImageUpload  username={currentuser.displayName} id={currentuser.uid}/>
        //  <UserProfile openProfile = {openProfile} setOpenProfile = {setOpenProfile} />
      ) : (
        <h3>"Let's login and upload your own photo!"</h3>
      )}
     </div>
   



      
      <div className='postcss'>
         {/* show all the phpto on screen/loop */}
      {
      post.map(({id,posttime,post}) => (
        //reason why add a key is to refresh website just the new part
        <Post key={id.toString()}
         postId={id} 
        //  time={timestamp}
        // time={posttime}
         time={post.timestamp}
         currentid={currentuser.uid}
         username={post.username} 
         currentuser={currentuser} 
         postnameid={post._id}
         caption={post.caption} imageUrl={post.imageUrl}/>
    
         
      ))
      
      }
      </div>
     
      
    </div>
  );
}

export default App;
