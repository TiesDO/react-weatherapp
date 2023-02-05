import React from 'react';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay';
import SelectCityForm from './components/SelectCityForm';
import { CurrentWeatherProvider } from './context/CurrentWeatherContext';

const App = () => {
    return (
        <CurrentWeatherProvider>
            <div className="background-element"></div>
            <div className='content-wrapper glass-background'>
                <SelectCityForm />
                <CurrentWeatherDisplay />
            </div>
        </CurrentWeatherProvider>
    )
}

export default App
