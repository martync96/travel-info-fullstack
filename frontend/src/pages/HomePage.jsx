import SearchBox from '../components/SearchBox.jsx';

const HomePage = () => {

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <h1 className="homeHeading">Search For a Location Below</h1>
                        <h3 className="homeSubHeading">to find out more..</h3>
                        <SearchBox className="my-2 my-lg-0 d-flex flex-column align-items-center searchbox-home" buttonClass={"btn btn-dark search-button home-search-button"}/>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>
        </>
    )
}


export default HomePage;