import LoginDropdown from './LoginDropdown.jsx'
import SavedLocationsDropdown from './SavedLocationsDropdown.jsx';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {

    const navigate = useNavigate();

    const navigateHome = () => { navigate(`/`) }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">
            <div className="container-fluid">
                <div className="col-3 d-flex">
                    <a className="navbar-brand" href="#"></a>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link home-link" onClick={navigateHome} >
                                Home
                            </a>
                        </li>
                    </ul>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="col-3 d-flex justify-content-center align-items-center">
                        <div className="ml-auto searchbox">
                            {window.location.pathname === '/' ? '' : <SearchBox className="form-inline my-2 my-lg-0 searchbox-nav" buttonClass={"btn btn-dark search-button navbar-search-button"} />}
                        </div>
                    </div>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="col-3 d-flex justify-content-center align-items-center">
                        <ul className="navbar-nav">
                            <SavedLocationsDropdown favouriteLocations={props.favouriteLocations} />
                        </ul>
                    </div>
                    <div className="col-3 d-flex justify-content-center align-items-center">
                        <LoginDropdown signedIn={props.signedIn} setSignedIn={props.setSignedIn} favouriteLocations={props.favouriteLocations} setFavouriteLocations={props.setFavouriteLocations} />
                    </div>
                    
                </div>
            </div>
        </nav>
    );
};

export default NavBar;