import React, { useReducer, createContext, useContext } from 'react';
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
