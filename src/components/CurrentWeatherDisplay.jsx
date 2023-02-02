import React from "react";
import {useCurrentWeather} from '../context/CurrentWeatherContext';

export default function CurrentWeatherDisplay() {
    // consume the context
    const currentWeather = useCurrentWeather();

    return <div>
        I should be showing the current weather conditions.
    </div>
}
