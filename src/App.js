import React from 'react';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay';
import SelectCityForm from './components/SelectCityForm';
import { CurrentWeatherProvider } from './context/CurrentWeatherContext';
import Background from './components/Background';

const App = () => {
    return (
        <CurrentWeatherProvider>
            <Background />
            <div className='content-wrapper glass-background'>
                <div className='inner-content-wrapper'>
                    <SelectCityForm />
                    <CurrentWeatherDisplay />
                </div>
            </div>
        </CurrentWeatherProvider>
    )
}

export default App
