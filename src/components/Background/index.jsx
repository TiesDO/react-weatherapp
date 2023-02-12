import React from 'react';
import { useCurrentWeather, FindWeatherObject } from '../../context/CurrentWeatherContext.jsx';

export default function Background() {
    const state = useCurrentWeather();

    let image = FindWeatherObject(state.requestData?.current_weather?.weathercode).image;
    return <div className='background-element' style={{backgroundImage: `url('${image}')`}}></div>
}
