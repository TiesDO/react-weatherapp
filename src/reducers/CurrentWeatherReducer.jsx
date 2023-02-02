export default function CurrentWeatherReducer(state, action) {
    switch(action.type)
    {
        case 'update_currentWeather':
            return {
                ...state,
                requestData: action.payload
            }
        case 'update_error':
            return {
                ...state,
                requestError: action.payload
            }
        case 'set_loading':
            return {
                ...state,
                requestLoading: action.payload
            }
        case 'update_lat':
            return {
                ...state,
                locationLat: action.payload
            }
        case 'update_lon':
            return {
                ...state,
                locationLon: action.payload
            }
    }

    throw new Error('Unknown action: ' + action.type);
}

export function CurrentWeatherInitialState() {
    return {
        requestLoading: false,
        requestError: null,
        requestData: null,
        locationLat: 51.56,
        locationLon: 5.09
    }
}
