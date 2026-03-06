import "../styles/Header.css"
import Settings from "./Settings"

import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass as compassSolid,   faUser as userSolid,   faHeart as heartSolid, faPlus, faMinus, faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { faCompass as compassRegular, faUser as userRegular, faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

import Reports  from "./Reports"
import Favorite from "./Favorite"
import Profile  from "./Profile"

export default function Header({map, setPage, getPage, control, 
  settingsVisible, setSettingsVisible, setAppTheme, getAppTheme, updateAppTheme}: {
  setPage: (page:"map"|"favorite"|"profile") => void, 
  getPage:string, map:null|null, 
  control:boolean, settingsVisible:boolean, 
  getAppTheme:boolean
  setSettingsVisible: (state:boolean) => void,
  setAppTheme: (state:boolean) => void, 
  updateAppTheme: () => void
}) {
  const [menuVisible, setMenuVisible] = useState<boolean>(true);

  interface Menu {
    [index:number]: {
      title:string,
      icon:[IconDefinition, IconDefinition],
      page:"map"|"favorite"|"profile"
    }
  };

  const navmenu:Menu = {
    0: {
      title: "Исследовать",
      icon: [compassSolid, compassRegular],
      page: "map"
    },
    1: {
      title: "Избранные",
      icon: [heartSolid, heartRegular],
      page: "favorite"
    },
    2: {
      title: "Профиль",
      icon: [userSolid, userRegular],
      page: "profile"
    }
  };

  function mapZoom(zooming:boolean):void {
    if (map) {
      // (zooming) ? map.zoomIn() : map.zoomOut();
    } else console.error("Map is null:",map);
  };

  return (
    <>
      <Settings 
        setState={setSettingsVisible} getState={settingsVisible}
        setAppTheme={setAppTheme} getAppTheme={getAppTheme} 
        updateAppTheme={updateAppTheme}
      />

      <nav className="pc-container">
        <button onClick={() => setMenuVisible(true)} 
        className={!menuVisible ? "visible" : "invisible"} id="ui-open-menu">
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
              {Object.entries(navmenu).map(([key,index]) => (
                <button key={key} onClick={() => setPage(index.page)} 
                className={getPage === index.page ? "active" : ""} >
                  {index.title}
                </button>
              ))}
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
            {Object.entries(navmenu).map(([key,index]) => (
              <button onClick={() => setPage(index.page)} className={getPage === index.page ? "active" : ""}>
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