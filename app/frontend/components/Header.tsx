import "../styles/Header.css"

import Reports  from "./Reports"
import Favorite from "./Favorite"
import Profile  from "./Profile"
import Settings from "./Settings"

import { Map as AppMain } from "maplibre-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconDefinition, faCompass as compassSolid,   faHeart as heartSolid, faPlus, faMinus, faClose, faBars, faCog } from "@fortawesome/free-solid-svg-icons";
import { faCompass as compassRegular, faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

interface Menu {
  [index:number]: {
    title:string,
    icon:[IconDefinition, IconDefinition],
    page:"map" | "favorite" | "profile"
  }
};

export default function Header({
  map, setPage, getPage, settingsVisible, 
  setSettingsVisible, setAppTheme, getAppTheme, 
  updateAppTheme, screenWidth
}: {
  setPage: (page:"map" | "favorite" | "profile") => void, 
  getPage:string, map:AppMain | null, 
  settingsVisible:boolean, getAppTheme:boolean, 
  screenWidth:number, setSettingsVisible: (state:boolean) => void,
  setAppTheme: (state:boolean) => void, updateAppTheme: () => void
}) {
  const [menuVisible, setMenuVisible] = useState<boolean>(true);
  const [placesVisible, setPlacesMenu] = useState<boolean>(false);
  const reportPage = <Reports map={map} setMobileMenu={setPlacesMenu} screenWidth={screenWidth}/>

  const navmenu:Menu = {
    0: {title: "Исследовать", icon: [compassSolid, compassRegular], page: "map"},
    1: {title: "Избранное", icon: [heartSolid, heartRegular], page: "favorite"}
  };

  function mapZoom(zooming:boolean):void {
    if (map) (zooming) ? map.zoomIn() : map.zoomOut();
  };

  return (
    <>
      <Settings 
        setState={setSettingsVisible} getState={settingsVisible}
        setAppTheme={setAppTheme} getAppTheme={getAppTheme} 
        updateAppTheme={updateAppTheme}/>

      <nav className="pc-container">
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
                {getPage === "profile" && "Профиль"}
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
            {getPage === "favorite" && <Favorite/>}
            {getPage === "profile" && <Profile setSettings={setSettingsVisible}/>}
          </section>
        </header>

        {((getPage === "map" && screenWidth <= 1000 )||(screenWidth >= 1000)) && (
          <div id="map-control" className={placesVisible ? "invisible" : ""}>
            <button onClick={() => setSettingsVisible(true)}><FontAwesomeIcon icon={faCog}/></button>
            <button onClick={() => mapZoom(true)}><FontAwesomeIcon icon={faPlus}/></button>
            <button onClick={() => mapZoom(false)}><FontAwesomeIcon icon={faMinus}/></button>
          </div>
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
              <button key={key} onClick={() => setPage(index.page)} 
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