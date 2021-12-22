/** @format */

import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';

// CSS & MUI Icons
import './address.scss';
import { Search, GpsFixed, MyLocation, Clear } from '@mui/icons-material';

function Address(props) {
  const { isScriptLoaded, isScriptLoadSucceed, address, setAddress } = props;

  const handleChange = value => {
    setAddress(value);
  };

  const handleSelect = value => {
    setAddress(value);
  };

  if (isScriptLoaded && isScriptLoadSucceed) {
    return (
      <div className='address'>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
          className='address__container'
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <div className='address__query'>
                <MyLocation className='address__icon map' />
                <input
                  {...getInputProps({
                    placeholder: 'Enter shipping address',
                  })}
                  value={address}
                  className='address__input'
                />
                <button onClick={() => setAddress('')}>
                  <Clear className='address__icon clear' />
                </button>
              </div>
              <div className='address__result'>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const style = suggestion.active
                    ? {
                        backgroundColor: '#ebebeb',
                        cursor: 'pointer',
                        paddingLeft: '1rem',
                      }
                    : {
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        paddingLeft: '1rem',
                      };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`,
])(Address);
