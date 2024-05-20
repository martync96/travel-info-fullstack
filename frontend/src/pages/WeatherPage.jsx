import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';  
import axios from 'axios';

const WeatherPage = (props) => {
    
    const { location } = useParams();
    const [ city, setCity ] = useState('');
    const [ weatherData, setWeatherData ] = useState([]);

    const handleWeatherInformation = (response) => {
        setCity(response.data.city.name);
        setWeatherData(response.data);
    }

    useEffect(() => {
        axios.get(`http://api.openweathermap.org//data/2.5/forecast?q=${location}&appid=9ab396b1eeb18a2d3e5aaf280537e941`).then((response) => {
            handleWeatherInformation(response);
        }).catch((error) => {

        });
    }, []);

    return(
        <>
            <p>{city}</p>
        </>
    )
}

export default WeatherPage;