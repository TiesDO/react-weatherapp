import React from 'react';
import { useCurrentWeather, useCurrentWeatherDispatch } from "../../context/CurrentWeatherContext";
import fetchCurrentWeather from "../../datafetch/fetchCurrentWeather";
import { LabeledInputElement, SelectCityInput } from "../InputElements/";

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

    const handleCityChoosen = (e, data) => {
        currentWeatherDispatch({ type: 'update_lat', payload: data.lat});
        currentWeatherDispatch({ type: 'update_lon', payload: data.lon});
        handleSubmit(e);
    }

    return <> 
        <form className="select-location-wrapper" onSubmit={handleSubmit}>
            <div className='inner-wrapper'>
                <LabeledInputElement 
                    placeHolder="lat"
                    value={currentWeather.locationLat}
                    onChange={handleLatChange}
                    labelText='&#176;N' />

                <LabeledInputElement 
                    placeHolder="lon"
                    value={currentWeather.locationLon}
                    onChange={handleLonChange}
                    labelText='&#176;E' />

                <SelectCityInput onCityChoosen={handleCityChoosen}/>   
            </div>
        </form>

        {currentWeather.requestError && <span style={{color: '#ff0000'}}>error: {currentWeather.requestError.message ?? currentWeather.requestError}</span>}
    </>
}
