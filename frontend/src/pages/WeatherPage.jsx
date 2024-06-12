import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WeatherForecast from '../components/WeatherForecast.jsx';
import NotificationModal from '../components/NotificationModal.jsx';
import axios from 'axios';
import favouritedIcon from "/assets/favourited.png";
import unfavouriteIcon from "/assets/unfavourited.png";

const WeatherPage = (props) => {


    const { location } = useParams();
    const [locationID, setLocationID] = useState(''); //state to store the location ID of the city
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState({});
    const [favourited, setFavourited] = useState(false);
    //modal states
    const [show, setShow] = useState(false); //state to show/hide modal
    const [error, setError] = useState(""); //state to pass error message to the modal 
    const handleClose = () => setShow(false); //function to close modal
    const handleShow = () => setShow(true); //function to show modal

    const handleModal = (error) => {
        setError(error);
        handleShow();   
    }

    const handleWeatherInformation = (response) => {
        setCity(response.data.city.name);
        setWeatherData(response.data);
        checkDuplicate(response.data.city.name, props.favouriteLocations);
    }

    const checkDuplicate = (city, favouriteLocations) => {
        if (favouriteLocations.some(location => location.city === city)) {
            setFavourited(true);
            getLocationID(city, favouriteLocations); //if the city is already in the favourites, get the location ID
        }
    }

    const getLocationID = (city, favouriteLocations) => {
        const location = favouriteLocations.find(location => location.city === city);
        setLocationID(location._id);
    };

    useEffect(() => {
        checkDuplicate(city, props.favouriteLocations);
    }, [city, props.favouriteLocations]);

    useEffect(() => {
        axios.get(`http://api.openweathermap.org//data/2.5/forecast?q=${location}&appid=9ab396b1eeb18a2d3e5aaf280537e941`)
            .then((response) => {
                handleWeatherInformation(response);
            }).catch((error) => {
                handleModal(error.message);
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
                localStorage.setItem('favouriteLocations', JSON.stringify(response.data.favouriteLocations));
                props.setFavouriteLocations(response.data.favouriteLocations);
                setFavourited(true);
            })
        }catch(error){
            handleModal(error.message);
        }
    };

    const removeFromFavourites = async () => {
        const removeLocationData = {
            email: localStorage.getItem('email'),
            locationID: locationID
        };
        try{
            axios.delete(`http://localhost:4000/remove`, {
                data: removeLocationData,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((response) => {
                if(response.status === 200) {
                    const updatedFavouriteLocations = response.data.user.favouriteLocations;
                    localStorage.setItem('favouriteLocations', JSON.stringify(updatedFavouriteLocations));
                    props.setFavouriteLocations(updatedFavouriteLocations);
                    setFavourited(false);
                    handleModal("Location successfully removed from favourites");
                }
            }).catch((error) => {
                setError(error.message);
            });
        }catch(error){
            handleModal(error.message);
        }
    };

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
                    <NotificationModal show={show} handleClose={handleClose} error={error} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default WeatherPage;