import SearchBox from '../components/SearchBox.jsx';

const HomePage = () => {

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <SearchBox className="my-2 my-lg-0 d-flex flex-column align-items-center"/>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>
        </>
    )
}


export default HomePage;