import "../styles/Reports.css"

import { AppContext } from "./PlacesContext"  
import { Map as MapLibre } from "maplibre-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSolid, faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";

export default function Reports({map, setMobileMenu, screenWidth}: 
  {map:MapLibre | null, setMobileMenu: (state:boolean) => void, screenWidth:number}) {

  const context = useContext(AppContext);
  if (!context) return null;
  const { appPlaces, toggleLike } = context;

  if (Object.keys(appPlaces).length === 0) {
    return (
      <div className="place-container" id="empty">
        <span><FontAwesomeIcon icon={faMagnifyingGlassLocation}/></span>
        <p>Нету точек интереса</p>
      </div>
    );
  };

  return (
    <div className="place-container">
      {Object.entries(appPlaces).map(([key,item]) => (
        <article key={key} onClick={() => {
          if (map) map.flyTo({center: [item.coords[1], item.coords[0]], zoom: 16, pitch: 0, bearing: 0}); 
          setMobileMenu(false);
        }}>
          <div className="place-info">
            <img src={item.image} alt="" />
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