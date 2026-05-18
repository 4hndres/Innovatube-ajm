import React, { useState } from 'react'

const SearchBar = ({placeholder = "Buscar", onQuery}) => {
    const [query, setQuery] = useState('');

  const handleSearch = () => {
    onQuery(query);
    setQuery('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        console.log('ay ay ay')
          handleSearch();
    }
  };

    return (
    <div className='search-bar'>
        <div className='form-container'>
            <input
              type="text"
              name="searchText"
              placeholder={placeholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
            />
        </div>
    </div>
  )
}

export default SearchBar
