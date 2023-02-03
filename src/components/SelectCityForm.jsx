import { useCurrentWeather, useCurrentWeatherDispatch } from "../context/CurrentWeatherContext";
import React from 'react';
import fetchCurrentWeather from "../datafetch/fetchCurrentWeather";
import SelectCityInputSuggestion from "./SelectCityInputSuggestion";

export default function SelectCityForm() {
    const currentWeather = useCurrentWeather();
    const currentWeatherDispatch = useCurrentWeatherDispatch();

    const handleLatChange = (e) => {
        currentWeatherDispatch({ type: 'update_lat', payload: e.target.value });
    }

    const handleLonChange = (e) => {
        currentWeatherDispatch({ type: 'update_lon', payload: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        currentWeatherDispatch({ type: 'set_loading', payload: true});

        // make the API call and update the context accordingly
        fetchCurrentWeather(currentWeather.locationLat, currentWeather.locationLon)
            .then((data) => { 
                currentWeatherDispatch({ type: 'update_currentWeather', payload: data }) 
                currentWeatherDispatch({ type: 'update_error', payload: null});
            })
            .catch((error) => { 
                // I don't reset the old data so it can still be displayed (as outdated)
                currentWeatherDispatch({ type: 'update_error', payload: error})
            })
            .finally(() => {
                // unset loading, regardless of error state
                currentWeatherDispatch({ type: 'set_loading', payload: false });
            });
    }

    return <>
        <div className="background-element"></div>
        <form className="select-location-wrapper" onSubmit={handleSubmit}>
            <input type='text' placeholder="lat" value={currentWeather.locationLat} onChange={handleLatChange} />    
            <span className="coordinate">&#176;N</span>
            <input type='text' placeholder="lon" value={currentWeather.locationLon} onChange={handleLonChange} />    
            <span className="coordinate">&#176;E</span>

            <SelectCityInputSuggestion />

            <input type='submit' value='change location' />    
        </form>
        {currentWeather.requestError && <span style={{color: '#ff0000'}}>error: {currentWeather.requestError.message ?? currentWeather.requestError}</span>}
    </>
}
