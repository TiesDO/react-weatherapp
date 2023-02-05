import React, { useState, useEffect, useCallback } from 'react';
import { CircleFlag } from 'react-circle-flags';
import fetchCitySuggestions from '../../datafetch/fetchCitySuggestions';

export function SelectCityInput({onCityChoosen}) {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [suggestions, setSuggestions] = useState([]);
    const [input, setInput] = useState('');
    const [inputActive, setInputActive] = useState(false);

    // update suggestions when the input get's altered
    useEffect(() => {
        if (input && input.length > 2)
        {
            setLoading(true);

            fetchCitySuggestions(input)
                .then((data) => {
                    setSuggestions(data.results.map((r) => {
                        return {
                            name: r.name,
                            admin: r.admin1,
                            countryCode: r.country_code,
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
        <div className='glass-input-wrapper suggestion-input-wrapper'>

            {/* TODO: Find cleaner solution for hiding and showing the suggestions */}
            <input type="text" value={input} placeholder='choose a city' 
                onChange={(e) => setInput(e.target.value)} 
                onFocus={() => setInputActive(true)}
                onBlur={() => setTimeout(() => setInputActive(false), 200)}/>
            
            {/* dummy ul for styling */}
            <ul className='glass-background'
                style={{display: inputActive && suggestions.length > 0 ? 'block' : 'none'}}>
                {suggestions.map(s => {
                    return <CountrySuggestionItem 
                        key={s.id}
                        onCityChoosen={onCityChoosen}
                        data={s} />
                })}
            </ul>
        </div>
    )
}

function CountrySuggestionItem(props) {
    const { name, admin, countryCode } = props.data;

    const handleClick = (e) => {
        e.stopPropagation();
        props.onCityChoosen(e, props.data);
    }

    return (<li onClick={handleClick}>
        <CircleFlag countryCode={countryCode.toLowerCase()} height='35' /> 
        <div className='text-wrapper'>
            <span className='name'>{name}</span> 
            <span className='admin'>{admin}</span>
        </div>
    </li>)
}
