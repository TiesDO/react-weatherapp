export default function CurrentWeatherReducer(state, action) {
    switch(action.type)
    {
        
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
