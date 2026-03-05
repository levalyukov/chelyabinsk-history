import "../styles/Header.css"
import Settings from "./Settings"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass as compassSolid,   faUser as userSolid,   faHeart as heartSolid, faPlus, faMinus, faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { faCompass as compassRegular, faUser as userRegular, faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { Map } from 'leaflet'; 
import { useState } from "react";

import Reports  from "./Reports"
import Favorite from "./Favorite"
import Profile  from "./Profile"

export default function Header({map, setPage, getPage, control, 
  settingsVisible, setSettingsVisible}: {
  setPage: (page:"map" | "favorite" | "profile") => void, 
  getPage:string, map:Map | null, 
  control:boolean, settingsVisible:boolean, 
  setSettingsVisible: (state:boolean) => void,
}) {
  const [menuVisible, setMenuVisible] = useState<boolean>(true);

  function mapZoom(zooming:boolean):void {
    if (map) {
      (zooming) ? map.zoomIn() : map.zoomOut();
    } else console.error("Map is null:",map);
  };

  return (
    <>
      <Settings setState={setSettingsVisible} getState={settingsVisible}/>

      <nav className="pc-container">
        <button onClick={() => setMenuVisible(true)} className={!menuVisible ? "visible" : "invisible"} id="ui-open-menu">
          <FontAwesomeIcon icon={faBars}/>
        </button>

        <header id="pc" className={menuVisible ? "" : "invisible"}>
          <div className="header">
            <span className="header-content">
              <h1>
                {getPage === "map" && "Точки интереса"}
                {getPage === "favorite" && "Избранные"}
                {getPage === "profile" && "Профиль"}
              </h1>
          
              <button onClick={() => setMenuVisible(false)}>
                <FontAwesomeIcon icon={faClose}/>
              </button>
            </span>

            <div className="navmenu-container">
              <button onClick={() => setPage("map")} className={getPage === "map" ? "active" : ""}>Все</button>
              <button onClick={() => setPage("favorite")} className={getPage === "favorite" ? "active" : ""}>Избранные</button>
              <button onClick={() => setPage("profile")} className={getPage === "profile" ? "active" : ""}>Профиль</button>
            </div>
          </div>

          <section className="pc-page">
            {getPage === "map" && <Reports map={map}/>}
            {getPage === "favorite" && <Favorite/>}
            {getPage === "profile" && <Profile setSettings={setSettingsVisible}/>}
          </section>
        </header>

        {control && (
          <div className="map-control">
            <button onClick={() => mapZoom(true)}><FontAwesomeIcon icon={faPlus}/></button>
            <button onClick={() => mapZoom(false)}><FontAwesomeIcon icon={faMinus}/></button>
          </div>
        )}
      </nav>

      <div className="mobile-canvas">
        <header className="mobile">
          <nav className="links-container">
            
            <button onClick={() => setPage("map")} className={getPage === "map" ? "active" : ""}>
              <span><FontAwesomeIcon icon={getPage === "map" ? compassSolid : compassRegular}/></span>
              <p>Исследовать</p>
            </button>

            <button onClick={() => setPage("favorite")} className={getPage === "favorite" ? "active" : ""}>
              <span><FontAwesomeIcon icon={getPage === "favorite" ? heartSolid : heartRegular}/></span>
              <p>Избранное</p>
            </button>

            <button onClick={() => setPage("profile")} className={getPage === "profile" ? "active" : ""}>
              <span><FontAwesomeIcon icon={getPage === "profile" ? userSolid : userRegular}/></span>
              <p>Профиль</p>
            </button>
          </nav>
        </header>
      </div>
    </>
  );
};