const ForecastBox = ( props ) => {

    return (
        <>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{props.day}</h5>
                        <img className="card-img-top" src={`/assets/weather-images/${props.icon}.svg`} alt="img to display weather"/> 
                        <p className="card-text">{props.temperature}°c</p>
                        <p className="card-text">{props.weatherDesc}</p>
                    </div>
            </div>
        </>
    )
};

export default ForecastBox;