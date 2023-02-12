import React from "react";
import { useCurrentWeather, FindWeatherObject } from '../../context/CurrentWeatherContext';

export default function CurrentWeatherDisplay() {
    let currentWeather = useCurrentWeather().requestData?.current_weather;

    return ( 
        <div className="current-weather-container">
            <div className="weather-code">
                <h2>{currentWeather?.temperature ?? "_"}&#176;</h2>
                {FindWeatherObject(currentWeather?.weathercode).icon(60)}
            </div>
            <div className="data-pane">
                <div>
                    <span>windspeed: </span>
                    <span>{currentWeather?.windspeed ?? "_"} km/h</span>
                </div>
                
                <div>
                    <span>winddirection: </span>
                    <span>NE</span>
                </div>

                <div>
                    <span>elevation: </span>
                    <span>{useCurrentWeather()?.requestData?.elevation ?? "_"} m</span>
                </div>

                <div>
                    <span>time: </span>
                    <span>{currentWeather?.time ?? "_"}</span>
                </div>
            </div>
        </div>
    )
}
