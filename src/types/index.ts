export type WeatherType = {
    base: string;
    clouds: {
        all: number; // %
    };
    cod: number;
    coord: {
        lon: number;
        lat: number;
    }
    dt: number; // Time of data calculation, unix, UTC
    id: number; // City ID
    main: {
        feels_like: number; // This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        grnd_level: number; // Atmospheric pressure on the ground level, hPa
        humidity: number; // Humidity, %
        pressure: number; // Atmospheric pressure on the sea level, hPa
        sea_level: number; // Atmospheric pressure on the sea level, hPa
        temp: number; // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        temp_max: number; // Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        temp_min: number; // Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    };
    name: string; // City name.
    sys: {
        country: string; // Country code 
        sunrise: number; // Sunrise time, unix, UTC
        sunset: number; // Sunset time, unix, UTC
    }
    timezone: number; // Shift in seconds from UTC
    visibility: number; // Visibility, meter. The maximum value of the visibility is 10 km
    weather: {
        id: number; // Weather condition id
        main: string; // Group of weather parameters (Rain, Snow, Clouds etc.)
        description: string; // Weather condition within the group.
        icon: string; // Weather icon id
    }[];
    wind: {
        speed: number; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
        deg: number; // Wind direction, degrees (meteorological)
        gust: number; // Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
    }
}