import React, { useState, useRef, useContext } from 'react'
import { MDBBtn, MDBProgress } from "mdbreact";
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import Context from '../contexts/Context';
import { DropzoneArea } from 'material-ui-dropzone';

import '../styles/upload.scss';
 
const Upload = () => {
  const { state, dispatch } = useContext(Context);
  const { files } = state;

  // const history = createBrowserHistory();

  const [progress1, setProgress1] = useState(null);
  const [progress2, setProgress2] = useState(null);
  const [progress3, setProgress3] = useState(null);

  const redirectEl = useRef(null);

  const handleChange = (filesChange) => {
    dispatch({ type: 'SET_FILES', payload: filesChange });
  }

  const handleDrop = (filesDrop) => {
    // console.log(filesDrop);
  }

  // const handleRedirect = () => {
  //     history.push('/');
  // };

  const fileUploadHandler = () => {
    let i = 0;
    let fd = [];
    let total = [];
    let loaded = [];
    files.map((file, index) => {
      fd[index] = new FormData();
      fd[index].append('image', file, file.name);
      return axios.post('https://us-central1-fb-cloud-functions-e686c.cloudfunctions.net/uploadFile', fd[index], {
        onUploadProgress: progressEvent=> {
          if (index === 0) {
            loaded[0] = progressEvent.loaded;
            total[0] = progressEvent.total;
            setProgress1(Math.round(loaded[0] / total[0] * 100));
          } else if (index === 1) {
            loaded[1] = progressEvent.loaded;
            total[1] = progressEvent.total;
            setProgress2(Math.round(loaded[1] / total[1] * 100));
          } else if (index === 2) {
            loaded[2] = progressEvent.loaded;
            total[2] = progressEvent.total;
            setProgress3(Math.round(loaded[2] / total[2] * 100));
          }
        }
      })
      .then(res => {
        i = i + 1;
        if (i === files.length) {
          redirectEl.current.click();
        }
      });
    })
 }

  return (
      <div className='container'>
          <DropzoneArea 
              onChange={handleChange}
              onDrop={handleDrop}
          />
          <MDBBtn onClick={fileUploadHandler} color="unique" className='upload-button'>Upload</MDBBtn>
          <Link style={{ display: 'none' }} to='/' ref={redirectEl}>Redirect</Link>
          {progress1 && <MDBProgress value={progress1} className="my-2" />}
          {progress1 && <p>{progress1}%</p>}
          {progress2 && <MDBProgress value={progress2} className="my-2" />}
          {progress2 && <p>{progress2}%</p>}
          {progress3 && <MDBProgress value={progress3} className="my-2" />}
          {progress3 && <p>{progress3}%</p>}
      </div>
  )  

} 
 
export default Upload;