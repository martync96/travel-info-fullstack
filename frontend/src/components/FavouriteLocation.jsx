import favouritedIcon from "/assets/favourited.png";

const FavouriteLocation = (props) => {

    const favouriteLocations = props.favouriteLocations.map((data, index) =>
        <div key={index} className="col-4 favLocations" data-testid="fav-location">
            <img src={favouritedIcon}  alt="Favourited" data-testid="remove-btn"/>
          <p className="fav-loc-tem">{data.city}</p>
        </div>
    );
    return(
        <div className="row">
            {favouriteLocations}
        </div>
    );
};

export default FavouriteLocation