import favouritedIcon from "/assets/favourited.png";
import NotificationModal from "./NotificationModal.jsx";
import axios from 'axios';
import { useState } from "react";

const FavouriteLocation = (props) => {
    
    //modal states
    const [show, setShow] = useState(false); //state to show/hide modal
    const [error, setError] = useState(""); //state to pass error message to the modal 
    const handleClose = () => setShow(false); //function to close modal
    const handleShow = () => setShow(true); //function to show modal

    const handleModal = (error) => {
        setError(error);
        handleShow();   
    }

    const removeFromFavourites = async (locationID) => {
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
                    handleModal("Location successfully removed from favourites");
                }
            }).catch((error) => {
                setError(error.message);
            });
        }catch(error){
            handleModal(error.message);
        }
    };

    const favouriteLocations = props.favouriteLocations.map((data, index) =>
        <div key={data._id} className="col-4 favLocations" data-testid="fav-location">
            <img src={favouritedIcon} onClick={() => removeFromFavourites(data._id)}  alt="Favourited" data-testid="remove-btn"/>
          <p className="fav-loc-tem">{data.city}</p>
        </div>
    );
    return(
        <div className="row">
            {favouriteLocations}
            <NotificationModal show={show} handleClose={handleClose} error={error} />
        </div>
    );
};

export default FavouriteLocation