import { useCurrentWeather } from "../context/CurrentWeatherContext";
import React, { useState } from 'react';
import fetchCurrentWeather from "../datafetch/fetchCurrentWeather";

export default function SelectCityForm() {
    const currentWeather = useCurrentWeather();

    const [city, setCity] = useState('some value');
    const [lat, setLat] = useState(currentWeather.lat ?? '');
    const [lon, setLon] = useState(currentWeather.lon ?? '');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`input was [lat:'${lat}', lon:'${lon}', city:'${city}']`);

        // fetch the current weather for these coordinates
        fetchCurrentWeather(lat, lon)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return <form onSubmit={handleSubmit}>
        <input type='text' value={lat} onChange={(e) => setLat(e.target.value)} />    
        <input type='text' value={lon} onChange={(e) => setLon(e.target.value)} />    
        <input type='text' value={city} onChange={(e) => setCity(e.target.value)} />    
        <input type='submit' value='change location' />    
    </form>
}