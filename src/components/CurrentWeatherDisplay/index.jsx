import React from "react";
import {useCurrentWeather} from '../../context/CurrentWeatherContext';
import { WiDayCloudy } from "weather-icons-react";

export default function CurrentWeatherDisplay() {
    // consume the context
    const currentWeather = useCurrentWeather();

    return <div>
        {currentWeather.requestData && <><WiDayCloudy size={25} /> <span>{currentWeather.requestData.current_weather.temperature}</span></>}
    </div>
}
