import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import {db} from './App'
import firebase from 'firebase/compat/app';
import './Profilepage.css'
 
 function Postprofile({image,title}) {
    // console.log('here')
    //  console.log(imageUrl)
   return (
     <div className='divbox'>
         
         <img className='picture' src={image}/>
         {/* <h5>{image}</h5> */}
         <h3>{'Title'}{':'}{''}{title}</h3>
     </div>
   )
 }
 
 export default Postprofile