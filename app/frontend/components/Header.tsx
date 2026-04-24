import "../styles/Header.css"

import Reports  from        "./Reports"
import Favorite from        "./Favorite"
import Settings from        "./modals/Settings"
import UserGeolocation from "./modals/UserGeolocation"

import { setUserMarker } from "./Map"
import { Map as MapLibre } from "maplibre-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconDefinition, faCompass as compassSolid,   faHeart as heartSolid, faPlus, faMinus, faClose, faBars, faCog, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faCompass as compassRegular, faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import { AppContext } from "../interfaces/reports.provider"

interface Menu {
  [index:number]: {
    title:string,
    icon:[IconDefinition, IconDefinition],
    page:"map" | "favorite"
  };
};

export default function Header ({
  map, setPage, getPage, settingsVisible, 
  setSettingsVisible, setAppTheme, getAppTheme, 
  updateAppTheme, screenWidth, setReportView
}: {
  setPage: (page:"map" | "favorite") => void, 
  getPage:string, map:MapLibre | null, 
  settingsVisible:boolean, getAppTheme:boolean, 
  screenWidth:number, setSettingsVisible: (state:boolean) => void,
  setAppTheme: (state:boolean) => void, updateAppTheme: () => void,
  setReportView: (id:number) => void
}) : React.ReactNode {
  const context = useContext(AppContext);
  if (!context) return null;
  const { closeAllPopup } = context;
  const [menuVisible, setMenuVisible] = useState<boolean>(true);
  const [placesVisible, setPlacesMenu] = useState<boolean>(false);
  const reportPage = <Reports map={map} setMobileMenu={setPlacesMenu} screenWidth={screenWidth}/>
  const [UserGeolocationModal, setUserGeolocationVisible] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");

  const navmenu:Menu = {
    0: {title: "Исследовать", icon: [compassSolid, compassRegular], page: "map"},
    1: {title: "Избранное", icon: [heartSolid, heartRegular], page: "favorite"}
  };

  return (
    <>
      <Settings 
        setState={setSettingsVisible} getState={settingsVisible}
        setAppTheme={setAppTheme} getAppTheme={getAppTheme} 
        updateAppTheme={updateAppTheme}/>

      <UserGeolocation errorTitle={errorTitle} errorText={errorText} 
      UGvisible={UserGeolocationModal} setUG={setUserGeolocationVisible}/>

      <nav className="pc-container">
        {screenWidth > 1000 && (<>
          <button onClick={() => setMenuVisible(true)} 
          className={!menuVisible ? "visible" : "invisible"} id="ui-open-menu">
            <FontAwesomeIcon icon={faBars}/>
          </button>

          <header data-testid="pc-navmenu" id="pc" className={menuVisible ? "" : "invisible"}>
            <div className="header">
              <span className="header-content">
                <h1>
                  {getPage === "map" && "Точки интереса"}
                  {getPage === "favorite" && "Избранное"}
                </h1>
            
                <button onClick={() => setMenuVisible(false)}>
                  <FontAwesomeIcon icon={faClose}/>
                </button>
              </span>

              <div className="navmenu-container">
                {Object.entries(navmenu).map(([key,index]) => (
                  <button key={key} onClick={() => setPage(index.page)} 
                  className={getPage === index.page ? "active" : ""} >
                    {index.title}
                  </button>
                ))}
              </div>
            </div>

            <section className="pc-page">
              {getPage === "map" && reportPage}
              {getPage === "favorite" && <Favorite map={map} screenWidth={screenWidth} setPage={setPage} appPage={getPage} setReportView={setReportView}/>}
            </section>
          </header>
        </>)}

        {((getPage === "map" && screenWidth <= 1000 )||(screenWidth > 1000)) && (
          <div id="map-control" className={placesVisible ? "invisible" : ""}>
            <button onClick={() => setSettingsVisible(true)}><FontAwesomeIcon icon={faCog}/></button>
            {screenWidth > 1000 && (
            <nav className="map-control-main">
              <button onClick={() => {if (map) map.zoomIn();}}><FontAwesomeIcon icon={faPlus}/></button>
              <button onClick={() => {if (map) map.zoomOut();}}><FontAwesomeIcon icon={faMinus}/></button>
              <button className="user-geolocation" onClick={() => {
                closeAllPopup();
                getGeolocation({map, setErrorTitle, setErrorText, setUserGeolocationVisible});
              }}><FontAwesomeIcon icon={faLocationArrow}/></button>
            </nav>
            )}
          </div>
        )}

        {(getPage === "map" && screenWidth <= 1000) && (
          <nav id="map-control-mobile" className={placesVisible ? "invisible" : ""}>
            <button onClick={() => {if (map) map.zoomIn();}}><FontAwesomeIcon icon={faPlus}/></button>
            <button onClick={() => {if (map) map.zoomOut();}}><FontAwesomeIcon icon={faMinus}/></button>
            <button className="user-geolocation" onClick={() => {
              closeAllPopup();
              getGeolocation({map, setErrorTitle, setErrorText, setUserGeolocationVisible});
            }}><FontAwesomeIcon icon={faLocationArrow}/></button>
          </nav>
        )}
      </nav>

      {/* ------ Mobile Menu ------ */}

      <div className="mobile">
        {(getPage == "map" && screenWidth <= 1000) && (
        <div id="places-menu" className={placesVisible ? "visible" : "invisible"}>
          <nav className="places-menu-header">
            <button onClick={() => setPlacesMenu(false)} style={!placesVisible 
              ? {visibility: "hidden"} : {visibility: "visible"}}>
              <FontAwesomeIcon icon={faMinus}/>
            </button>
          </nav>

          <div className="places-menu-content">
            <h1>Точки интереса</h1>
            {reportPage}
          </div>
        </div>
        )}

        <header className="mobile-menu">
          {getPage == "map" && (
            <nav className="places-button">
              <button onClick={() => setPlacesMenu(true)}
              style={placesVisible ? {visibility: "hidden"} : {visibility: "visible"}}>
                <FontAwesomeIcon icon={faMinus}/>
              </button>
            </nav>
          )}

          <nav className="actions">
            {Object.entries(navmenu).map(([key,index]) => (
              <button key={key} onClick={() => {
                closeAllPopup();
                setPage(index.page);
                setPlacesMenu(false);
              }} 
              className={getPage === index.page ? "active" : ""}>
                <span><FontAwesomeIcon icon={getPage === index.page ? index.icon[0] : index.icon[1]}/></span>
                <p>{index.title}</p>
              </button>
            ))}
          </nav>
        </header>
      </div>
    </>
  );
};

function getGeolocation({map, setErrorTitle, setErrorText, setUserGeolocationVisible}: 
  {map: MapLibre | null, setErrorTitle: (error:string) => void, setErrorText: (error:string) => void
  setUserGeolocationVisible: (state: boolean) => void}) {
  if (map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => (geolocationSuccess({position, map, setErrorTitle, setErrorText})), 
        (error) => geolocationError({error, setErrorTitle, setErrorText, setUserGeolocationVisible}), 
        {
          enableHighAccuracy: true,
          timeout: 16000,
          maximumAge: Infinity
        }
      );
    };
  };
};

function geolocationSuccess({position, map, setErrorTitle, setErrorText}: {
  map: MapLibre | null,
  position: GeolocationPosition, 
  setErrorTitle: (code:string) => void, 
  setErrorText: (code:string) => void
}) {
  if (map) {
    setErrorTitle("");
    setErrorText("");
    setUserMarker({map,position});
    map.flyTo({
      center: [position.coords.longitude, position.coords.latitude], 
      zoom: 16, 
      pitch: 0, 
      bearing: 0
    });
  };
};

function geolocationError({error, setErrorTitle, setErrorText, setUserGeolocationVisible}: {
  error: GeolocationPositionError, 
  setErrorTitle: (code:string) => void, 
  setErrorText: (code:string) => void,
  setUserGeolocationVisible: (state:boolean) => void
}) {
  setUserGeolocationVisible(true);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      setErrorTitle("Где вы?");
      setErrorText("Гадать не будем - просто включите геопозицию.");
      break;

    case error.TIMEOUT:
      setErrorTitle("Спутники не отвечают");
      setErrorText("Они немного заняты, крутятся вокруг Земли. Пожалуйста, повторите попытку.");
      break;

    case error.POSITION_UNAVAILABLE:
      setErrorTitle("Нет сигнала GPS");
      setErrorText("Мы пытались, но не смогли поймать спутник. Проверьте, включена ли геолокация на устройстве, и попробуйте еще раз.");
      break;
  };
};