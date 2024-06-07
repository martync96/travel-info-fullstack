import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WeatherForecast from '../components/WeatherForecast.jsx';
import axios from 'axios';
import favouritedIcon from "/assets/favourited.png";
import unfavouriteIcon from "/assets/unfavourited.png";

const WeatherPage = (props) => {


    const { location } = useParams();
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState({});
    const [favourited, setFavourited] = useState(false);

    const handleWeatherInformation = (response) => {
        setCity(response.data.city.name);
        setWeatherData(response.data);
        checkDuplicate(response.data.city.name, props.favouriteLocations);
    }

    const checkDuplicate = (city, favouriteLocations) => {
        if (favouriteLocations.some(location => location.city === city)) {
            setFavourited(true);
        }
    }

    useEffect(() => {
        checkDuplicate(city, props.favouriteLocations);
    }, [city, props.favouriteLocations]);

    useEffect(() => {
        axios.get(`http://api.openweathermap.org//data/2.5/forecast?q=${location}&appid=9ab396b1eeb18a2d3e5aaf280537e941`)
            .then((response) => {
                handleWeatherInformation(response);
            }).catch((error) => {
                console.log('Error:', error.message);
            });
    }, [location]);

    const addToFavourites = () => {
        const newFavourite = {
            email: localStorage.getItem('email'),
            location:{ city: city, country: weatherData.city.country}
        };
        try{
            axios.post(`http://localhost:4000/addFavouriteLocation`, newFavourite, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((response) => {
                console.log(response.data.favouriteLocations);
                // localStorage.setItem('favouriteLocations', JSON.stringify(response.data.favouriteLocations));
                props.setFavouriteLocations(response.data.favouriteLocations);
                setFavourited(true);
            })
        }catch(error){

        }
    };

    const removeFromFavourites = () => {};

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <div className="WeatherPageHeading">
                            <h1>Telling you about..</h1>
                            <h2>{city || 'Loading'}</h2>
                            {favourited ? (
                                <>
                                    <img src={favouritedIcon} onClick={removeFromFavourites} data-testid="unfavourite"/>
                                    <p>Click to remove from favourites</p>
                                </>
                            ) : (
                                <>
                                    <img src={unfavouriteIcon} onClick={addToFavourites} data-testid="favourite"/>
                                    <p>Click to add to favourites</p>
                                </>
                            )}
                        </div>
                        {Object.keys(weatherData).length > 0 ? <WeatherForecast forecast={weatherData} /> : <p>Loading...</p>}
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>

        </>
    )
}

export default WeatherPage;