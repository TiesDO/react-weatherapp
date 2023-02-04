import React, { useState, useEffect } from 'react';
import fetchCitySuggestions from '../../datafetch/fetchCitySuggestions';

export default function SelectCityInputSuggestion() {
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState('');

    // update suggestions when the input get's altered
    useEffect(() => {
        if (input && input.length > 2 && suggestions.length > 0)
        {
            setLoading(true);

            fetchCitySuggestions(input)
                .then((data) => {
                    setSuggestions(data.results.map((r) => {
                        return {
                            name: r.name,
                            country: r.country_code,
                            id: r.id,
                            lat: r.latitude,
                            lon: r.longitude
                        }
                    }));
                })
                .catch((error) =>{
                   setError(error.message); 
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [input]);

    return ( 
        <div className='suggestion-input-wrapper'>
            <input type="text" value={input} placeholder='choose a city' 
            onChange={(e)=> setInput(e.target.value)}/>
            <ul>
                {suggestions.map(s => (<li>{s.name}, {s.country}</li>))}
            </ul>
        </div>
    )
}
