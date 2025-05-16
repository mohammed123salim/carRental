
import { useState, useEffect } from "react";

const OPENCAGE_API_KEY = "4d86370d12e54166a34f9efd54c4be73";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [placeInfo, setPlaceInfo] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLocation({ latitude, longitude, accuracy });

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
            );
            const data = await response.json();

            if (data?.results?.length > 0) {
              const components = data.results[0].components;
              setPlaceInfo({
                city: components.city || components.town || components.village,
                region: components.state,
                country: components.country,
                latitude,
                longitude,
                accuracy,
              });
            }
          } catch (err) {
            console.error("Location fetch failed:", err);
          }
        },
        () => console.error("Permission denied or unavailable")
      );
    }
  }, []);


 
    
    

  return placeInfo;
};

export default useLocation;
