import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {usePersistedState} from "../hooks/usePersistedState";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = usePersistedState("auth", "");

    // const [auth, setAuth] = useState("");
    const [isAuthenticated, setisAuthenticated] = useState(!!auth);

    const navigate = useNavigate();

    const login = async (formData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log("response" + response);

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

    // useEffect(() => {
    //     console.log(auth);
    //     if (!isAuthenticated) {
    //         localStorage.removeItem("access_token");
    //         localStorage.removeItem("refresh_token");
    //         return;
    //     }

    //     fetch("http://127.0.0.1:8000/api/user/", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${auth}`,
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 if (response.status === 401) {
    //                     // Clear token if unauthorized
    //                     localStorage.removeItem("access_token");
    //                     localStorage.removeItem("refresh_token");
    //                     setAuth("");
    //                 }
    //                 throw new Error("Failed to fetch user data");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setUser(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching user data:", error);
    //         });
    // }, [isAuthenticated]);

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setAuth("");
        setUser(null);

        setisAuthenticated(false);
        navigate("/");
    };

    useEffect(() => {
        if (!auth) return;
        fetchUserData();
    }, [auth, isAuthenticated]);

    // useEffect(() => {
    //     if (auth) {
    //         fetchUserData(auth);
    //     }
    // }, [auth]);

    // const fetchUserData = async () => {
    //     if (auth) {
    //         try {
    //             const response = await fetch(`${import.meta.env.VITE_API_URL}user/`, {
    //                 headers: {
    //                     Authorization: `Bearer ${auth}`,
    //                 },
    //             });

    //             if (!response.ok) {
    //                 localStorage.removeItem("access_token");
    //                 localStorage.removeItem("refresh_token");
    //                 setAuth("");
    //                 throw new Error("Failed to fetch user data");
    //             }
    //             const data = await response.json();

    //             setUser(data);
    //         } catch (error) {
    //             localStorage.removeItem("access_token");
    //             localStorage.removeItem("refresh_token");
    //             setAuth("");
    //             setisAuthenticated(false);
    //             console.error("Failed to fetch user data:", error.message);
    //         }
    //     }
    // };

    const fetchUserData = async () => {
        if (!auth) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}user/`, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            });

            if (!response.ok) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                setAuth("");
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
