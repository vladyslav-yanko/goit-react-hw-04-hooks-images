import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'Component/Modal/Modal';

export default function ImageItem({ src, alt, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
    
  };

  
  

    return (
      <li className="ImageGalleryItem">
        <img onClick={toggleModal} alt={alt} src={src} className="" />
        {showModal && (
          <Modal onClose={toggleModal} src={largeImageURL} alt={alt} />
        )}
      </li>
    );
  
}

ImageItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
