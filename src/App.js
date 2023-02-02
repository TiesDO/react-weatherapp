import React from 'react';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay';
import { CurrentWeatherProvider } from './context/CurrentWeatherContext';

const App = () => {
    return (
        <CurrentWeatherProvider>
            <CurrentWeatherDisplay />
        </CurrentWeatherProvider>
    )
}

export default App
