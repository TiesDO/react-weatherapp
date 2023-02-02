import React from "react";
import {useCurrentWeather} from '../context/CurrentWeatherContext';

export default function CurrentWeatherDisplay() {
    // consume the context
    const currentWeather = useCurrentWeather();

    return <div>
        {currentWeather.requestLoading ? 'fetching data...' : ''}
        {currentWeather.requestData && <ul>
            {
                Object.values(currentWeather.requestData).map(v => <li>{v}</li>)
            }
        </ul>}
    </div>
}
