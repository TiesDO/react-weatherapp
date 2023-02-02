import React from 'react';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay';
import SelectCityForm from './components/SelectCityForm';
import { CurrentWeatherProvider } from './context/CurrentWeatherContext';

const App = () => {
    return (
        <CurrentWeatherProvider>
            <CurrentWeatherDisplay />
            <SelectCityForm />
        </CurrentWeatherProvider>
    )
}

export default App
