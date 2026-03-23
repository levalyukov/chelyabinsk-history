import "../styles/Favorite.css"

import { Map as MapLibre } from "maplibre-gl";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../interfaces/reports.provider";
import PlaceScheduleModal from "./modals/PlaceScheduleModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack, faMapLocationDot, faCirclePlay, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { type PlaceSchedule } from "../interfaces/reports.interface";

export default function Favorite({map, setPage, appPage, screenWidth}: {
  map: MapLibre | null, screenWidth:number, 
  appPage:"map" | "favorite" | "profile",
  setPage: (page:"map" | "favorite" | "profile") => void
}):React.ReactNode {
  const context = useContext(AppContext);
  if (!context) return null;
  const datetime = new Date();
  const todayIndex = datetime.getDay() === 0 ? 6 : datetime.getDay() - 1;
  const date = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"]
  const { appPlaces, closeAllPopup } = context;
  const placesEntries = Object.entries(appPlaces).filter(([key,index]) => (key && index.liked));

  const [hours, setHours] = useState(new Date().getHours());
  const [schedule, setVisibleSchedule] = useState<boolean>(false);
  const [scheduleModal, setScheduleModal] = useState<boolean>(false);
  const [placeSchedule, setPlaceSchedule] = useState<PlaceSchedule | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHours(new Date().getHours());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [])

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
                            }} id={hours >= item.popup.schedule[todayIndex].openHours ? "open" : "close"}>
                              {hours >= item.popup.schedule[todayIndex].openHours && hours < item.popup.schedule[todayIndex].closeHours
                              ? "Открыто до " + String(item.popup.schedule[todayIndex].closeHours).padStart(2, "0") 
                              + ":" + String(item.popup.schedule[todayIndex].closeMinutes).padStart(2, "0")
                              : "Закрыто до " + String(item.popup.schedule[todayIndex].openHours).padStart(2, "0") 
                              + ":" + String(item.popup.schedule[todayIndex].openMinutes).padStart(2, "0")}
                              <span><FontAwesomeIcon icon={faCaretDown}/></span>
                            </button>
                            <div className="dropdown-schedule-content" id={schedule ? "visible" : ""}>
                              {Object.keys(item.popup.schedule).map(([key]) => (
                                <p className="dropdown-content" key={key}
                                id={(todayIndex === Number(key)) ? "active" : ""}>
                                  {date[Number(key)]}
                                  <button>
                                    {item.popup.schedule[Number(key)]?.dayoff ? "Выходной" : (
                                      <>
                                        {String(item.popup.schedule[Number(key)]?.openHours).padStart(2, "0")}:
                                        {String(item.popup.schedule[Number(key)]?.openMinutes).padStart(2, "0")} 
                                        &nbsp;-&nbsp;
                                        {String(item.popup.schedule[Number(key)]?.closeHours).padStart(2, "0")}:
                                        {String(item.popup.schedule[Number(key)]?.closeMinutes).padStart(2, "0")}
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

                        closeAllPopup();
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