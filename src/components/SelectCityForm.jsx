import { useCurrentWeather, useCurrentWeatherDispatch } from "../context/CurrentWeatherContext";
import React, { useRef, useEffect, useState } from 'react';
import fetchCurrentWeather from "../datafetch/fetchCurrentWeather";
import fetchCitySuggesions from "../datafetch/fetchCitySuggestions";
import { useDebounce } from "../hooks/useDebounce";

export default function SelectCityForm() {
    const currentWeather = useCurrentWeather();
    const currentWeatherDispatch = useCurrentWeatherDispatch();

    const datalist = useRef(null);
    const [draftCity, setDraftCity] = useState(''); // the raw value of the input box the user is typing in 
    const [cityOptions, setCityOptions] = useState([]);

    const handleLatChange = (e) => {
        currentWeatherDispatch({ type: 'update_lat', payload: e.target.value });
    }

    const handleLonChange = (e) => {
        currentWeatherDispatch({ type: 'update_lon', payload: e.target.value });
    }

    const handleCityChange = (e) => {
        setDraftCity(e.target.value);
    }

    const cityQuery = useDebounce(draftCity, 600);

    // draft city use effect
    useEffect(() => {
        fetchCitySuggesions(cityQuery)
            .then((data) => {
                setCityOptions(data.results.map(r => { return { name: r.name, lat: r.latitude, lon: r.longitude, id: r.id, country: r.country_code}}));
            })
            .catch((error) => console.error(error));
    }, [cityQuery])

    useEffect(() => {
        if (cityOptions && cityOptions.length > 0) {
            cityOptions.forEach(option => {
                if (option.name.toLowerCase() === draftCity.toLowerCase())
                {
                    currentWeatherDispatch({ type: 'update_lat', payload: option.lat })                    
                    currentWeatherDispatch({ type: 'update_lon', payload: option.lon })                    
                }
            });
        }
    }, [draftCity, cityOptions])

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
        <form onSubmit={handleSubmit}>
            <input type='text' value={currentWeather.locationLat} onChange={handleLatChange} />    
            <input type='text' value={currentWeather.locationLon} onChange={handleLonChange} />    

            <input type='text' list="citySuggestions" value={draftCity} onChange={handleCityChange} />    
            <datalist id='citySuggestions' ref={datalist}>
                {cityOptions && cityOptions.map(o => <option key={o.id} value={o.name}> {`${o.name}, ${o.country}`} </option>)}
            </datalist>   

            <input type='submit' value='change location' />    
        </form>
        {currentWeather.requestError && <span style={{color: '#ff0000'}}>error: {currentWeather.requestError.message ?? currentWeather.requestError}</span>}
    </>
}
