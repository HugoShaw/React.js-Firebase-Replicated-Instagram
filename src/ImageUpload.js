import React,{useState} from 'react'
import {storage,db} from './App'
import firebase from 'firebase/compat/app';
import {ref,getDownloadURL,uploadBytesResumable} from '@firebase/storage'
import './Imgupload.css';



function ImageUpload({username,id}) {
  const [progress, setProgress] =useState(0);
  const [image,setImage] =useState()
  const [titlename,setTitle] =useState('')

  const ListenTitle =(e)=>{
    setTitle(e.target.value)
  }

  const handleChange =(e)=>{
  
    setImage(e.target.files[0]);
  }

    const upload =(e) =>{
        e.preventDefault();
        const file = e.target[1].files[0];
        console.log(file)
        uploadFiles(file);
    };

    const uploadFiles = (file) =>{
        if(!file) return;
        const storageRef =ref(storage, '/files/${file.name}');
        const uploadTask =uploadBytesResumable(storageRef,file);

        uploadTask.on('state_changed',(snapshot) => {
                   const prog = Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                   );
                   setProgress(prog);

    },(err) =>console.log(err),
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url=>{
             console.log(url)
             db.collection('posts').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: titlename,
                imageUrl: url,
                username: username,
                _id:id,
                like_num:0
            });
                  setProgress(0);
                  setTitle('');
                  setImage(null);
                
        })
           
    });

    };



  return (
    <div className='image_upload'>
        <form onSubmit={upload}>
        <input type="text" placeholder='Type your title' onChange={ListenTitle} value={titlename}/>
        
            {/* <input type="file" className='input'/> */}
            <input type="file" className='input' onChange={handleChange}/>
           
            <button type='submit'>upload</button>
        </form>
        <h3>uploaded {progress} %</h3>
    </div>
  )
}

export default ImageUpload