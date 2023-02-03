import { isNullOrEmpty } from "../utils/inputValidation"

export default function fetchCitySuggestions(query) {
    return new Promise((accept, reject) => {
        if (isNullOrEmpty(query))
        {
            return reject(new Error('value is empty'))
        }

        const domain = 'geocoding-api.open-meteo.com';
        const url = `https://${domain}/v1/search?name=${query}`;

        fetch(url, {method: 'GET'})
            .then((response) => {
                if (!response.ok) { throw new Error(`http error: ${response.status}`)}
                return response.json();
            })
            .then((data) => {
                accept(data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}
