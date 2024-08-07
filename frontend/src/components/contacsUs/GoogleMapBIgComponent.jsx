import React, {useState, useEffect, useCallback} from "react";
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

function GoogleMapsBig({city, address}) {
    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_API_GOOGLE,
    });

    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);

    useEffect(() => {
        if (isLoaded && city) {
            const locationQuery = `${address}, ${city}`;

            const geocodeCity = async () => {
                try {
                    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationQuery)}&key=${import.meta.env.VITE_API_GOOGLE}`);
                    const data = await response.json();
                    if (data.status === "OK" && data.results.length > 0) {
                        const location = data.results[0].geometry.location;

                        setCenter({
                            lat: location.lat,
                            lng: location.lng,
                        });
                    } else {
                        console.error("Geocoding failed: ", data.status);
                        setCenter({
                            lat: 42.7339,
                            lng: 25.4858,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching geocode data: ", error);
                }
            };

            geocodeCity();
        }
    }, [isLoaded, city, address]);

    const onLoad = useCallback(
        function callback(map) {
            // Directly set center and zoom without using fitBounds
            if (center) {
                map.setCenter(center);
                map.setZoom(15); // Your desired zoom level
            }

            setMap(map);
        },
        [center]
    );

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded && center ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15} // Set the desired zoom level
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
    ) : (
        <div>Loading...</div>
    );
}

export default GoogleMapsBig;
