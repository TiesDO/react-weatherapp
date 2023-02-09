import React from "react";
import {useCurrentWeather} from '../../context/CurrentWeatherContext';
import { WiDayCloudy } from "weather-icons-react";

export default function CurrentWeatherDisplay() {
    const currentWeather = useCurrentWeather();

    return ( 
        <div className="current-weather-container">
            <div className="weather-code">
                <WiDayCloudy size={25} />
                <h2>8.2</h2>
            </div>
            <ul className="data-pane">
                <li>
                    <span>windspeed:</span>
                    <span>12km/h</span>
                </li>
                
                <li>
                    <span>winddirection:</span>
                    <span>NE</span>
                </li>

                <li>
                    <span>elevation:</span>
                    <span>12m</span>
                </li>

                <li>
                    <span>time:</span>
                    <span>15:00</span>
                </li>
            </ul>
        </div>
    )
}
