import "../styles/Favorite.css"

import { Map as MapLibre } from "maplibre-gl";
import { useState, useContext } from "react";
import { AppContext } from "./PlacesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack, faMapLocationDot, faCirclePlay, faCaretDown} from "@fortawesome/free-solid-svg-icons";

export default function Favorite({map}: {map: MapLibre | null}) {
  const context = useContext(AppContext);
  if (!context) return null;
  const datetime = new Date();
  const { appPlaces } = context;
  const placesEntries = Object.entries(appPlaces).filter(([key,index]) => (key && index.liked));

  const [schedule, setVisibleSchedule] = useState<boolean>(false);
  const dayIndex:number = datetime.getDay() === 0 ? 7 : datetime.getDay();

  if (placesEntries.length > 0) {
    return (
      <section className="favorite">
        <div className="favorite-container">
          {placesEntries.map(([key,item]) => (
            <article key={key} className="favorite-place">
              <img src={item.image} alt="favorite-image.jpg"/>
              <div className="favorite-place-info">
                <h2>{item.title} <span className="place-favorite-icon"><FontAwesomeIcon icon={faHeart}/></span></h2>
                <div className="place-schedule">
                  {
                    item.popup.schedule === undefined
                    ? (<p className="schedule">Круглосуточно</p>) 
                    : (
                      <nav>
                        <span className="place-schedule-dropdown">
                          <button className="place-schedule-current"
                          onClick={() => setVisibleSchedule(!schedule)}
                          id={datetime.getHours() >= item.popup.schedule[dayIndex].openHours ? "open" : "close"}>
                            {datetime.getHours() >= item.popup.schedule[dayIndex].openHours 
                            ? "Открыто до " + String(item.popup.schedule[dayIndex].closeHours).padStart(2, "0") 
                            + ":" + String(item.popup.schedule[dayIndex].closeMinutes).padStart(2, "0")
                            : "Закрыто до " + String(item.popup.schedule[dayIndex].openHours).padStart(2, "0") 
                            + ":" + String(item.popup.schedule[dayIndex].openMinutes).padStart(2, "0")}
                            <span><FontAwesomeIcon icon={faCaretDown}/></span>
                          </button>
                          <div className="dropdown-schedule-content" id={schedule ? "visible" : ""}>
                            {Object.keys(item.popup.schedule).map(([key]) => (
                              <p className="dropdown-content" key={key}
                              id={(dayIndex === Number(key)+1) ? "active" : ""}>
                                {new Date(datetime.getFullYear(), datetime.getMonth(), 
                                datetime.getDate()+Number(key)).toLocaleString("ru-ru", {weekday:"short"})} 
                                <button>
                                  {item.popup.schedule[dayIndex+Number(key)-1].dayoff ? "Выходной" : (
                                    <>
                                      {String(item.popup.schedule[dayIndex+Number(key)-1].openHours).padStart(2, "0")}:
                                      {String(item.popup.schedule[dayIndex+Number(key)-1].openMinutes).padStart(2, "0")} 
                                      &nbsp;-&nbsp;
                                      {String(item.popup.schedule[dayIndex+Number(key)-1].closeHours).padStart(2, "0")}:
                                      {String(item.popup.schedule[dayIndex+Number(key)-1].closeMinutes).padStart(2, "0")}
                                    </>
                                  )}
                                </button>
                              </p>
                            ))}
                          </div>
                        </span>
                      </nav>
                    )
                  }
                </div>
                <span className="place-actions">
                  <button onClick={() => {
                    if (map) map.flyTo({
                      center: [item.coords[1], item.coords[0]], 
                      zoom: 16, pitch: 0, bearing: 0
                    });}}><FontAwesomeIcon icon={faMapLocationDot}/> На карте</button>
                  <button className="place-report-button" onClick={() => {}}>Репортаж <FontAwesomeIcon icon={faCirclePlay} /></button>
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