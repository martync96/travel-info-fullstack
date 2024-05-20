import NotificationModal from './NotificationModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBox = ({className}) => {

    const [search, setSearch] = useState(''); //state for user input for search
    const [show, setShow] = useState(false); //state to show/hide modal
    const [error, setError] = useState(""); //state to pass error message to the modal 
    const [userInput, setUserInput] = useState(false); //state to check if user has entered any input

    const handleClose = () => setShow(false); //function to close modal
    const handleShow = () => setShow(true); //function to show modal

    const handleModal = (error) => {
        setError(error);
        handleShow();   
    }

    const navigate = useNavigate(); //navigate to search results page

    const setSearchItem = (e) => { 
        const trimmedInput = e.target.value.trim();
        setSearch(trimmedInput); 
        setUserInput(trimmedInput.length > 0); 
    }; //updates search state as input field is changed

    console.log(search)

    const searchForLocation = async (e) => {
        e.preventDefault(); //prevents page re-rendering on submit  
        try{
            const response = await axios.get(`http://api.openweathermap.org//data/2.5/forecast?q=${search}&appid=9ab396b1eeb18a2d3e5aaf280537e941`)
            if(response.status === 200) {
                navigate(`/weather/${search}`); //navigate to weather page with search query as parameter
            }
        } catch (e) {
            handleModal(e.message);
        }

    } //searches for location when search button is clicked

    return (
        <>
            <form className={`${className} `} onSubmit={searchForLocation}>
                <div className="search-container">
                    <input className="form-control mr-sm-2 mb-2 search-box" type="search" placeholder="Search" aria-label="Search" onChange={setSearchItem} />
                    <button className="btn btn-dark my-2 my-sm-0" type="submit" data-testid="searchButton" disabled={userInput ? false : true}>Search</button>
                </div>
            </form>
            <NotificationModal show={show} handleClose={handleClose} error={error} />
        </>
    );
};

export default SearchBox;