import favouritedIcon from "/assets/favourited.png";
import FavouriteLocation from "../components/FavouriteLocation";

const FavouriteLocations = (props) => {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                </div>
                <div className="col-8">
                    <div className="locationHeader">
                        <h1>Tell you about..</h1>
                        <h1>Favourite Locations</h1>
                    </div>
                    <div className="favouriteInfo">
                        <p>Click <img src={favouritedIcon}/> to remove from favourites</p>
                        <p>Click for more information</p>
                    </div>
                    <FavouriteLocation favouriteLocations={props.favouriteLocations} 
                    setFavouriteLocations={props.setFavouriteLocations} />
                </div>
                <div className="col-2">
                </div>
            </div>
        </div>
    )
};

export default FavouriteLocations;