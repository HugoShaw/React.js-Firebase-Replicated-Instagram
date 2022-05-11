import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import {db} from './App'
import firebase from 'firebase/compat/app';
import './Profilepage.css'
 
 function Followpart({followname,timelist}) {
   const time =timelist.toDate().toDateString()
   return (
     <div className='follow'>
         
         <h3>{'Following'}{':'}{'<'}{followname}{'>'}</h3>
         <h4>{'Time'}{':'}{time}</h4>

     </div>
   )
 }
 
 export default Followpart