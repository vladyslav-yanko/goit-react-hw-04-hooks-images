import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');
  

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());

    
  };

 const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast('Go clearly!');
      return;
    }

    onSubmit(query);
    setQuery( '' );
  };

  
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Try me!</span>
          </button>
          <input
            placeholder="lets search smth...."
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
