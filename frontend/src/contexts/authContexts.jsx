import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {usePersistedState} from "../hooks/usePersistedState";
import {API_URL} from "../config";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = usePersistedState("auth", "");

    // const [auth, setAuth] = useState("");
    const [isAuthenticated, setisAuthenticated] = useState(!!auth);

    const navigate = useNavigate();

    const login = async (formData) => {
        try {
            const response = await fetch(`${API_URL}token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }
            const data = await response.json();
            localStorage.clear();
            localStorage.setItem("access_token", data.access); // Store token in local storage

            localStorage.setItem("refresh_token", data.refresh);
            setAuth(data.access);

            // setUser(response.data);
            setisAuthenticated(true);
            // navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error.message);
            setError(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setAuth("");
        setUser(null);

        setisAuthenticated(false);
        navigate("/");
    };

    useEffect(() => {
        if (auth) {
            fetchUserData();
        } else {
            setisAuthenticated(false);

            setUser(null);
        }
    }, [auth]);

    const fetchUserData = async () => {
        if (!auth) return;

        try {
            const response = await fetch(`${API_URL}user/`, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            });

            if (!response.ok) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                setAuth("");
                setUser(null);
                setisAuthenticated(false);
                throw new Error("Failed to fetch user data");
            }

            const data = await response.json();

            setUser(data);
        } catch (error) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setAuth("");
            setisAuthenticated(false);
            console.error("Failed to fetch user data:", error.message);
        }
    };

    return <AuthContext.Provider value={{auth, user, isAuthenticated, login, logout, fetchUserData}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
