import { Spinner } from "react-bootstrap";

function LoadingOverlay({ show }) {
    if (!show) return null;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
            <Spinner animation="border" variant="light" />
        </div>
    );
}

export default LoadingOverlay;
