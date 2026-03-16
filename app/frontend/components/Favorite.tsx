import "../styles/Favorite.css"

import { useContext } from "react";
import { AppContext } from "./PlacesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack, faMapLocationDot, faCirclePlay } from "@fortawesome/free-solid-svg-icons";

export default function Favorite() {
  const context = useContext(AppContext);
  if (!context) return null;
  // const datetime = new Date();
  const { appPlaces } = context;
  const placesEntries = Object.entries(appPlaces).filter(([key,index]) => (key && index.liked));

  if (placesEntries.length > 0) {
    return (
      <section className="favorite">
        <div className="favorite-container">
          {placesEntries.map(([key,index]) => (
            <article key={key} className="favorite-place">
              <img src={index.image} alt="favorite-image.jpg"/>
              <div className="favorite-place-info">
                <h2>{index.title} <span className="place-favorite-icon"><FontAwesomeIcon icon={faHeart}/></span></h2>
                <p className="place-schedule">Откроются через 10 мин.</p>
                <span className="place-actions">
                  <button onClick={() => {}}><FontAwesomeIcon icon={faMapLocationDot}/> На карте</button>
                  <button onClick={() => {}}>Репортаж <FontAwesomeIcon icon={faCirclePlay} /></button>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  };

  return (
    <section className="favorite" id="empty">
      <span><FontAwesomeIcon icon={faHeartCrack}/></span>
      <p>Нету избранных мест</p>
    </section>
  );
};