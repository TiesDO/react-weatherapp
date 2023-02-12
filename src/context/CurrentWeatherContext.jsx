import React, { useReducer, createContext, useContext } from 'react';
import { WiCloud, WiDaySunny, WiMeteor, WiRain, WiShowers, WiSnow, WiFog } from 'weather-icons-react';
import CurrentWeatherReducer, { CurrentWeatherInitialState } from '../reducers/CurrentWeatherReducer';

export const CurrentWeatherContext = createContext(null);
export const CurrentWeatherDispatchContext = createContext(null);

export function CurrentWeatherProvider({ children }) {
    // create the reducer
    const [currentWeather, currentWeatherDispatch] = useReducer(
        CurrentWeatherReducer,
        CurrentWeatherInitialState()
    )

    // return the reducer state and dispatch inside context providers
    return (
        <CurrentWeatherContext.Provider value={currentWeather}>
            <CurrentWeatherDispatchContext.Provider value={currentWeatherDispatch} >
                { children }
            </CurrentWeatherDispatchContext.Provider>
        </CurrentWeatherContext.Provider>
    )
}

// wrap in custom hook
export function useCurrentWeather() {
    return useContext(CurrentWeatherContext);
}

export function useCurrentWeatherDispatch() {
    return useContext(CurrentWeatherDispatchContext);
}

export const WeathercodeTable = {
    clear: {
        codes: [0],
        image: "https://wallpaperaccess.com/full/2777158.jpg",
        icon: (size) => <WiDaySunny size={size} />
    },
    cloudy: {
        codes: [1,2,3],
        image: "https://wallpapercave.com/wp/wp7033984.jpg",
        icon: (size) => <WiCloud size={size} />
    },
    fog: {
        codes: [45, 48],
        image: "https://wallpapercave.com/wp/wp5168934.jpg",
        icon: (size) => <WiFog size={size} />
    },
    rain: {
        codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
        image: "https://wallpaperaccess.com/full/3125163.jpg",
        icon: (size) => <WiRain size={size} />
    },
    snow: {
        codes: [71, 73, 75, 77],
        image: "https://wallpapercave.com/wp/9uTVIpA.jpg",
        icon: (size) => <WiSnow size={size} />
    },
    shower: {
        codes: [80, 81, 82, 85, 86],
        image: "https://wallpaperaccess.com/full/3125163.jpg",
        icon: (size) => <WiShowers size={size} />
    },
    meteor: {
        codes: [],
        image: "https://wallpaperaccess.com/full/1253515.jpg",
        icon: (size) => <WiMeteor size={size} />
    }
}

// return the found code's object, or the default meteor if nothing matches
export const FindWeatherObject = (code) => {
    if (code === null) {return WeathercodeTable.meteor}
    let found = Object.values(WeathercodeTable).find(wc => wc.codes.includes(code));

    return found ?? WeathercodeTable.meteor;
}
