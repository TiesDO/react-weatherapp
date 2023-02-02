export default function fetchCurrentWeather(lat, lon) {
    return new Promise((accept, reject) => {
        // validate latitude and longitude values
        const whitespaceonlyRegex = /\S/;
        if (!(whitespaceonlyRegex.test(lat) || whitespaceonlyRegex.test(lon))) {
            return reject('values can not be empty'); 
        }

        if (isNaN(lat) || isNaN(lon)) {
            return reject('values are not floating point numbers');
        }

        let parsedLat = parseFloat(lat);
        let parsedLon = parseFloat(lon);

        if (parsedLat < -90 || parsedLat > 90 ||
            parsedLon < -180 || parsedLon > 180)
        {
            return reject('values not within accepted range');
        }

        // request parameters
        const domain = 'api.open-meteo.com';
        const parameters = [
            `latitude=${lat}`,
            `longitude=${lon}`
        ];

        const url = `https://${domain}/v1/forecast?${parameters.join('&')}`;
        const options = {
            method: 'GET'
        }

        // make the actual fetch request
        fetch(url, options)
            .then((raw) => {
                if (!raw.ok) {
                    throw new Error(`http error: '${raw.status}'`);
                }
                return raw.json();
            })
            .then((data) => {
                return accept(data);
            })
            .catch((error) => {
                return reject(error.message);
            })
    })
}
