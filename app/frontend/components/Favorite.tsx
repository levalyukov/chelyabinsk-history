import "../styles/Favorite.css"

import { Map as MapLibre } from "maplibre-gl";
import { useState, useContext } from "react";
import { AppContext } from "./PlacesContext";
import PlaceScheduleModal from "./modals/PlaceScheduleModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack, faMapLocationDot, faCirclePlay, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import type { PlaceSchedule } from "./PlacesStore";

export default function Favorite({map, setPage, appPage, screenWidth}: {
  map: MapLibre | null, screenWidth:number, 
  appPage:"map" | "favorite" | "profile",
  setPage: (page:"map" | "favorite" | "profile") => void
}) {
  const context = useContext(AppContext);
  if (!context) return null;
  const datetime = new Date();
  const { appPlaces } = context;
  const placesEntries = Object.entries(appPlaces).filter(([key,index]) => (key && index.liked));

  const [schedule, setVisibleSchedule] = useState<boolean>(false);
  const dayIndex:number = datetime.getDay() === 0 ? 6 : datetime.getDay();
  const [scheduleModal, setScheduleModal] = useState<boolean>(false);
  const [placeSchedule, setPlaceSchedule] = useState<PlaceSchedule | null>(null);

  if (placesEntries.length > 0) {
    return (
      <>
        <PlaceScheduleModal schedule={placeSchedule} visible={scheduleModal} changeVisible={setScheduleModal}/>

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
                            onClick={() => {
                              if (screenWidth > 1000) {
                                setVisibleSchedule(!schedule);
                                setScheduleModal(false);
                                setPlaceSchedule(null);
                              } else {
                                setVisibleSchedule(false);
                                setScheduleModal(true);
                                setPlaceSchedule(item.popup.schedule);
                              };
                            }}
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
                                    {item.popup.schedule[dayIndex+Number(key)-1]?.dayoff ? "Выходной" : (
                                      <>
                                        {String(item.popup.schedule[dayIndex+Number(key)-1]?.openHours).padStart(2, "0")}:
                                        {String(item.popup.schedule[dayIndex+Number(key)-1]?.openMinutes).padStart(2, "0")} 
                                        &nbsp;-&nbsp;
                                        {String(item.popup.schedule[dayIndex+Number(key)-1]?.closeHours).padStart(2, "0")}:
                                        {String(item.popup.schedule[dayIndex+Number(key)-1]?.closeMinutes).padStart(2, "0")}
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
                      if (map) {
                        let cooldown:number = 0;
                        if (screenWidth <= 1000 && appPage != "map") {
                          setPage("map");
                          cooldown = 250;
                        } else cooldown = 0;

                        setTimeout(() => {
                          map.flyTo({
                            center: [item.coords[1], item.coords[0]], 
                            zoom: 16, 
                            pitch: 0,
                            bearing: 0
                          });
                        }, cooldown);
                      }
                    }}>
                      <FontAwesomeIcon icon={faMapLocationDot}/> На карте
                    </button>
                    <button className="place-report-button" onClick={() => {}}>
                      Репортаж <FontAwesomeIcon icon={faCirclePlay}/>
                    </button>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </>
    );
  };

  return (
    <section className="favorite" id="empty">
      <span><FontAwesomeIcon icon={faHeartCrack}/></span>
      <p>Нету избранных мест</p>
    </section>
  );
};