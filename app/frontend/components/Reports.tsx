import "../styles/Reports.css"

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../interfaces/reports.provider"  
import { Map as MapLibre } from "maplibre-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassLocation, faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";

export default function Reports ({map, setMobileMenu, screenWidth}: {
  map:MapLibre | null, 
  setMobileMenu: (state:boolean) => void, 
  screenWidth:number
}) : React.ReactNode {
  const context = useContext(AppContext);
  if (!context) return null;
  const { appPlaces, toggleLike, closeAllPopup, setAppPlaces } = context;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function getReports () {
      try {
        const request = await fetch(`http://localhost:3000/api/reports`, {signal: AbortSignal.timeout(5000)});
        const result = await request.json();
        console.log(JSON.stringify(result));
        setAppPlaces(result);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
        console.error("Backend error: ", e);
      };
    }; 
    
    getReports();
  }, []);

  if (loading) {
    return (
      <div className="place-container" id="empty">
        <article id="empty"></article>
        <article id="empty"></article>
        <article id="empty"></article>
        <article id="empty"></article>
      </div>
    );
  };

  if (Object.keys(appPlaces).length === 0 || error) {
    return (
      <div className="place-container" id="error">
        <span><FontAwesomeIcon icon={faMagnifyingGlassLocation}/></span>
        <h1>Ой, а тут ничего нету!</h1>
        <p>Произошла ошибка при загрузке репортажей.</p>
      </div>
    );
  };

  return (
    <div className="place-container">
      {Object.entries(appPlaces).map(([key,item]) => (
        <article key={key} onClick={() => {
          if (map) {
            let value:number = 0;

            if (screenWidth <= 1000) value =  0.001;
            else value = 0.0015;

            map.flyTo({
              center: [item.coords[1], item.coords[0] + value], 
              zoom: 16, 
              pitch: 0, 
              bearing: 0
            });
          };

          if (item.marker !== undefined) {
            if (map) {
              closeAllPopup();
              map.once("moveend", () => {
                if (!item.marker.getPopup().isOpen())
                  item.marker.togglePopup();
                  item.marker.getPopup()
                  .setLngLat(item.marker.getLngLat())
                  .addTo(map);
              }); 
            };
          }; setMobileMenu(false);
        }}>
          <div className="place-info">
            <img src={item.image} alt="place-img.jpg" />
            <div className="place-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
          <button onClick={(event) => toggleLike(key,event)}>
            <span><FontAwesomeIcon icon={item.liked ? heartSolid : heartRegular}/></span> 
            {(screenWidth <= 500) && ((item.liked) ? ("В избранном") : ("Добавить в избранное"))}
          </button> 
        </article>
      ))}
    </div>
  );
};