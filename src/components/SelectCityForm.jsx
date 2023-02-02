import { useCurrentWeather, useCurrentWeatherDispatch } from "../context/CurrentWeatherContext";
import React, { useState } from 'react';
import fetchCurrentWeather from "../datafetch/fetchCurrentWeather";

export default function SelectCityForm() {
    const currentWeather = useCurrentWeather();
    const currentWeatherDispatch = useCurrentWeatherDispatch();

    const [city, setCity] = useState('some value');

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

    return <form onSubmit={handleSubmit}>
        <input type='text' value={currentWeather.locationLat} onChange={handleLatChange} />    
        <input type='text' value={currentWeather.locationLon} onChange={handleLonChange} />    

        <input type='text' value={city} onChange={(e) => setCity(e.target.value)} />    
        <input type='submit' value='change location' />    
    </form>
}
