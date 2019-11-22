import React, { useEffect, useContext } from 'react';
import Context from '../contexts/Context';
import fire from '../config/Fire';
import '../styles/gallery.css';

const Fetch = props => {
    const { state, dispatch } = useContext(Context);

    const { images, loaded, count } = state;

    const storage = fire.storage();
    const storageRef = storage.ref();

    const countImages = () => {
        storageRef.listAll().then(result => {
            dispatch({ type: 'COUNT_IMAGES', payload: result.items.length });
        });
    }

    const fetchImages = () => {
        let firestorageArray = [];

        storageRef.listAll().then(result => {
          result.items.map(imageRef => {
            return imageRef.getDownloadURL().then(url => {
              const id = Math.random().toString(36).substring(2);
              storageRef.child(imageRef.fullPath).getMetadata().then(function(metadata) {
                const time = metadata.timeCreated;
                firestorageArray.push({ id: id, imageUrl: url, time: time, resized: url.includes('resized-')});
                if (firestorageArray.length === count) {
                  dispatch({ type: 'FETCH_IMAGES', payload: firestorageArray.filter(({resized}) => !resized) });
                  dispatch({ type: 'SET_LOADED', payload: true });
                }
              }).catch(function(error) {
                console.log(error.message);
              });


            });
          });
        });
    };

    useEffect(() => {
        fetchImages();
        let isSubscribed = true;
        if (isSubscribed) {
            countImages();
        }
        return () => isSubscribed = false;
        // eslint-disable-next-line
    }, [count]);

    return(
        <div style={{ margin: '25px 15px' }}>
            <h2>Latest Photos</h2>
            <div className='container-fluid'>
                <div className='row'>
                <div className='containerw3 containerw3-margin'>
                    {loaded && images.sort(function(a,b) {
                      return new Date(b.time) - new Date(a.time);
                    }).map(url => (
                      // eslint-disable-next-line
                      <a key={url.id}>
                        <img src={url.imageUrl} alt={url.imageUrl} />
                      </a>
                    ))}
                </div>
                </div>
            </div>
            {images.length === 0 && <p>Upload picture</p>}
        </div>
    )
}

export default Fetch;