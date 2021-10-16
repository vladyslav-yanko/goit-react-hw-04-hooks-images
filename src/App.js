import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ApiPixabay from 'services/ApiPixabay';
import SearchForm from 'Component/SearchForm/SearchForm';
import './App.css';
import ImageGallery from 'Component/ImageGallery/ImageGallery';
import Button from 'Component/Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import ImageItem from 'Component/ImageItem/ImageItem';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export default function App () {

  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);


  useEffect(() => {
    if (!query) {
      return;
    }
   
    const renderImg = () => {
    
      setStatus(Status.PENDING);
   
      ApiPixabay.fetchImg(query, page)
        .then(response => {
          const responseLength = response.hits.length;

          if (responseLength === 0) {
            setError(new Error(`No search results for ${query}`));
            setStatus(Status.REJECTED);
          
            return;
          }

          setImages(prevState => ([...images, ...response.hits]));
        
          setStatus(Status.RESOLVED);

        
        })

        .catch(error => {
          setError(error); setStatus(Status.REJECTED)
        });
      
    };
renderImg();
  }, [page, query]);

  const onLoad = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = newQuery => {
    if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);

    
  };

 

 
   

    return (
      <div className="App">
        <SearchForm onSubmit={handleFormSubmit}></SearchForm>
        <ToastContainer autoClose={4000} />
        {status === Status.IDLE && (
          <div className="imgGreet">
            Hello=)
            
          </div>
        )}
        <ImageGallery images={images} />
        {status === Status.REJECTED && (
          <div className="imgGreet">
            {error.message}
            <img
              src="https://cdn.pixabay.com/photo/2016/02/19/10/13/pug-1209129_960_720.jpg"
              alt=""
            />
          </div>
        )}
        {status === Status.PENDING && (
          <Loader
            type="Puff"
            color="#3fb566"
            height={100}
            width={200}
            timeout={3000}
          />
        )}
        {status === Status.RESOLVED && <Button onClick={onLoad} />}
      </div>
    );
  
}
