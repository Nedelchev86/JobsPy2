import React from "react";
import {Link} from "react-router-dom";

// ErrorBoundary class component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    // This lifecycle method is invoked after an error has been thrown
    static getDerivedStateFromError(error) {
        // Update state to render fallback UI
        return {hasError: true};
    }

    // This lifecycle method is invoked after an error is caught
    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI if there's an error
            return (
                <div className="error-area">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="error-content">
                                    <h1>Opps!</h1>
                                    <h2>Something went wrong.</h2>
                                    <p>We're working to fix the problem. Please try again later.</p>
                                    <div className="button">
                                        <Link to="/" className="btn">
                                            Go To Home
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Render children if there's no error
        return this.props.children;
    }
}

export default ErrorBoundary;
