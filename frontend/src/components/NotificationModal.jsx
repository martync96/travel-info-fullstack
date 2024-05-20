const NotificationModal = (props) => {

    return (
        <div className={`modal fade ${props.show ? 'show' : ''}`} style={{ display: props.show ? 'block' : 'none' }} 
        id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-testid="notificationModal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"></h5>
                    </div>
                    <div className="modal-body">
                        <p>{props.error}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;