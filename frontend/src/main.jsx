import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./contexts/Contexts.jsx";
import {JobProvider} from "./contexts/JobContext";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <JobProvider>
                <App />
            </JobProvider>
        </AuthProvider>
    </BrowserRouter>
);
