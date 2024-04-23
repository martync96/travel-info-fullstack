import LoginDropdown from './LoginDropdown.jsx'

const NavBar = (props) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="col-3 d-flex">
                    <a className="navbar-brand" href="#"></a>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link home-link" href="#" >
                                Home
                            </a>
                        </li>
                    </ul>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="col-3 d-flex justify-content-center align-items-center">
                        <ul className="navbar-nav">
                        </ul>
                    </div>
                    <div className="col-3 d-flex justify-content-center align-items-center">
                    <LoginDropdown signedIn={props.signedIn} setSignedIn={props.setSignedIn}/>
                    </div>
                    <div className="col-3 d-flex justify-content-center align-items-center">
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;