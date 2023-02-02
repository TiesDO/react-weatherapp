import React, { useEffect, useReducer, useState } from 'react'
import { CurrentWeatherReducer } from '../reducers/CurrentWeatherReducer';

export function CurrentWeather() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [state, dispatch] = useReducer(
        CurrentWeatherReducer,
        {},
    )

    console.log(state.test);

    // link to the current weather in Tilburg 
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.56&longitude=5.09&current_weather=true";
    const options = {
        method: "GET",
    }

    useEffect(() => {
       fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
            setError(null);
        })
        .catch((err) => {
            setError(err.message);
            setData(null);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);
    
    return (
        <div>
            <h2>Current Weather</h2>
            {loading && <i>Fetching data ...</i>}
            {error && (
                <div>
                    {console.log(error)}
                    There was a problem retrieving the data. <i>See console for more information</i>
                </div>
            )}
            {data && (<b>
                {data.latitude}<span>&#176;</span>N &nbsp;               
                {data.longitude}<span>&#176;</span>E                
                <br/>
                {data.current_weather.temperature} <span>&#176;</span>C
            </b>)}
        </div>
    )

}
