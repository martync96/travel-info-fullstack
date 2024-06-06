import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SavedLocationsDropdown = (props) => {

    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();

    const navigateToFavouriteLocations = () => {
        navigate('/favourite-locations');
    }

    const handleDropdown = () => {
        setDropdown(!dropdown);
    };

    const favouriteLocationsMap = props.favouriteLocations.map((data, index) => 
        <a key={index} className="dropdown-item" onClick={() => navigate(`/weather/${data.city}`)}>
            {data.city}
        </a>
    );

    console.log(props.favouriteLocations)

    return(
        <>
        <li className={`nav-item dropdown ${props.favouriteLocations.length != 0 ? '' : 'favourites-dropdown-hidden'}`} data-testid='fav-dropdown'>
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" 
                                aria-haspopup="true" aria-expanded="false" onClick={handleDropdown}>
                                    My Saved Locations
                                </a>
                                <div className={`dropdown-menu ${dropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownMenuLink">
                                    {favouriteLocationsMap}
                                    <a className="faveLocations" onClick={navigateToFavouriteLocations}>View All Favourite Locations</a>
                                </div>
                            </li>
        </>
    );
}

export default SavedLocationsDropdown;