import React, { useEffect, useState } from 'react'
import './post.css'
import Avatar from '@mui/material/Avatar';
import {db} from './App'
import firebase from 'firebase/compat/app';


function Post({postId,currentuser, username,caption,imageUrl,time,currentid,postnameid}) {

  const [comments,setComments]= useState([]);
  const [comment,setComment]= useState('');
  const [deletepost, setDelete] =useState(false);
  const [follow, setFollow] =useState(false);
  const [unfollow, setUnFollow] =useState(false);
  const [timep,setTime]= useState();
  const [like, setLike] = useState(true);
  const [likenumber, setLikenumber] = useState();
  const [likenumbers, setLikenumbers] = useState([]);
  const [deleteid, setDeleteid] = useState();
 
  useEffect (()=> {
     if(postId){
       return ()=>{
         db
          .collection('posts')
           .doc(postId)
           .collection('comments')
           .orderBy('timestamp','asc')
           .onSnapshot((snapshot) => {
             setComments(snapshot.docs.map((doc) => doc.data()))

            //  setTime(snapshot.docs.map((doc) => time.toDate().toDateString()))
           })
       }
     }
  },[postId])

  useEffect (()=> {
    if(postId){
      return ()=>{
        db
         .collection('posts')
          .doc(postId)
          .collection('like')
          .onSnapshot((snapshot) => {
            setLikenumbers(snapshot.docs.map((doc) => doc.id))

           //  setTime(snapshot.docs.map((doc) => time.toDate().toDateString()))
          })
      }
    }
 },[postId])
 //likenumbers
  


 const Posttime =()=> setTime(time.toDate().toDateString())


//  useEffect (()=> {
//   return ()=>{
//   const p =db
//   .collection('posts')
//    .doc(postId)
//   .get();
//   p.then((e)=>{
//     setLikenumber(e.data().like_num)
//   })
// }
// },[likenumber])

// useEffect(() => {
//   db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
//   //every time a new post is added, this code run. Like a camera.
//     setPost(snapshot.docs.map(doc => ({
//      id:doc.id,
//      post:doc.data(),
//      //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     })));
//  })
// },[]);


  useEffect (()=> {
    // setTime(time)
   
    if(username==currentuser.displayName){
      return ()=>{
         setDelete(true)
      }
    }
    setFollow(true)
    setUnFollow(true)
    setTime(time.toDate().toDateString())
    
  },[])




 console.log(timep)
  // useEffect (()=> {
   
  //   const sub =()=> setTime(time.toDate().toDateString())
  //   return ()=>{
  //     sub();
  //   }
  // },[postId])

  const a = timep


  // const posttime= time.toDate().toDateString()
  const postcomment =(e)=> {
    e.preventDefault();
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: currentuser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),

    })
    setComment('')
  }
  const Postdelete =()=>{
    firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .delete();
  }

  const following =()=>{
    firebase
    .firestore()
    .collection("follow")
    .doc(currentid)
    .collection('userfollow')
    .doc(postnameid)
    .set({
      name: username,
      time: firebase.firestore.FieldValue.serverTimestamp()
    });
    
  }
  const unfollowing =()=>{
    firebase
    .firestore()
    .collection("follow")
    .doc(currentid)
    .collection('userfollow')
    .doc(postnameid)
    .delete();
    
  }

  const commenttocomment=()=>{
    console.log('haha')
    db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        
           .onSnapshot((snapshot) => {
             setComments(snapshot.docs.map((doc) => doc.data()))

            //  setTime(snapshot.docs.map((doc) => time.toDate().toDateString()))
           })
  }

  const userlike =()=>{
    // if(like){
      db
    .collection("posts")
    .doc(postId)
    .collection('like')
    
    .add({
      id:currentid
    })
    console.log('add')
    // }else{
    //   db
    // .collection("posts")
    // .doc(postId)
    // .collection('like')
    // .where(("id", "==", currentid))
    // .delete()
    // console.log('delete')
    // db.collection('posts')
    // .doc(postId)
    // .collection('like')
    // .where("id", "==", currentid).onSnapshot(snapshot => {
    //   setDeleteid(snapshot.docs.map(doc => doc.id));
    //   console.log('hhh')
    //   console.log(deleteid)
    // })
    // }
    
    

  //   if(like){
  //     p.get()
  //     .then(()=>{
  //       p.update({like_num:firebase.firestore.FieldValue.increment(-1)})
  //       console.log('number -1')
       
  //  })
  //  }else{
  //    p.get()
  //  .then(()=>{
  //       p.update({like_num:firebase.firestore.FieldValue.increment(1)})
  //       console.log('number +1')
  //  })
  //  }
  
   setLike(!like)
    
  }

  return (
   
    <div className='post'>
        <div className='post_headerpart'>
          {
            
          }
          
          <img
            
            className='userImg'
            src={require("./Avatar.png")}
          />
      
              
        <h3>{username}</h3>
        {/* <img
            onClick={userlike}
            className='userlike'
            src={require("./like.png")}
          /> */}
        <span className='delete'></span>
        {
          deletepost && 
          <button  onClick={Postdelete}>
             Delete
          </button>
        }
        {
          deletepost && 
          <button  onClick={Posttime}>
          time
       </button>
        }
        {
          follow &&
          <button  onClick={following}>
          follow
       </button>
        }
         {
          unfollow &&
          <button  onClick={unfollowing}>
          unfollow
       </button>
        }
        
        
        </div>
        
        <img className="post_img" src={imageUrl}/>
        
        {/* <h4 className='post_text'><strong>{time.toDate().toDateString()}:</strong></h4> */}
        <div className='time'>
       <h4 className='post_text'><strong>Title-</strong>{caption}</h4>
       {/* comment part */}
       <h4 className='post_text'><strong>Date:</strong>{a}</h4>
       <img
            onClick={userlike}
            className='userlike'
            src={require("./like.png")}
          />
          <label>{'+'}{likenumbers.length}</label>
       
        </div>

       <div className='posttt' >
           {
             comments.map((n)=>(
               <p onClick={commenttocomment}>
                 <strong> {n.username}: </strong> {n.text}
                 {' ['}{a}{']'}
               </p>
              
             ))
           }


       </div>
       {currentuser &&(
         <form className='post_comment_box'>
         <input
         value={comment}
         className='Post_comment'
         type='text'
         placeholder='Add comment here'
         onChange={(e) =>{
          setComment(e.target.value)
         }}
         />
         <button 
         className='Comment_btn'
         disabled={!comment}
         type="submit"
         onClick={postcomment}
         > Post
         </button> 
         
       </form>

       )}

       
    </div>
  )
}

export default Post