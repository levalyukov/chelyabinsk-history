import "../styles/Header.css"
import "../styles/Menu-Pages.css"
import Settings from "./Settings"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass as compassSolid,   faUser as userSolid,   faHeart as heartSolid, faPlus, faMinus, faClose, faBars, faCog } from "@fortawesome/free-solid-svg-icons";
import { faCompass as compassRegular, faUser as userRegular, faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { Map } from 'leaflet'; 
import { useState } from "react";

export default function Header({map, setPage, getPage}: 
  {setPage: (page:"map" | "favorite" | "profile") => void, getPage:string, map:Map | null}) {

  const [menuVisible, setMenuVisible] = useState<boolean>(true);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  interface PlaceData {
    [index:number]: {
      image:string,
      title:string,
      description:string
      coords: number[],
      liked:boolean
    };
  };

  const places:PlaceData = {
    0: {
      image: "https://towntravel.ru/wp-content/uploads/2014/07/7880-%D0%A3%D0%BB%D0%B8%D1%86%D0%B0-%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D0%B0.-%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC-%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%B0-1024x682.jpg",
      title: "Кировка",
      description: "???",
      coords: [55.160, 61.401],
      liked: false
    },
    1: {
      image: "https://images.fooby.ru/1/40/16/1957565",
      title: "Парк Гагарина",
      description: "???",
      coords: [55.165097, 61.364797],
      liked: false
    },
    2: {
      image: "https://n1s1.hsmedia.ru/55/c6/c1/55c6c1056736ea4a585276947bf46cb8/656x369_1_78921a5a9ea226e3bf588382840b157d@960x540_0xOhcn6zXI_8091120617152733728.jpg.webp",
      title: "Белый Рынок",
      description: "???",
      coords: [55.1564750, 61.3700180],
      liked: false
    }
  };

  function changeMapPosition(lat:number, lng:number):void {
    if (map) {
      map.flyTo([lat,lng], 17);
    };
  };

  function mapZoom(zooming:boolean):void {
    if (map) {
      (zooming) ? map.zoomIn() : map.zoomOut();
    };
  };

  const [place, setPlaces] = useState<PlaceData>(places);
  function toggleLike(key:string, event: React.MouseEvent):void {
    event.stopPropagation();
    const index = Number(key);
    setPlaces((element) => {
      if (!element[index]) return element;

      return {
        ...element,
        [index]: {
          ...element[index],
          liked: !element[index].liked
        }
      };
    });
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

            {getPage === "map" && (
            <div className="place-container">
              {Object.entries(place).map(([key,item]) => (
                <article key={key} onClick={() => changeMapPosition(item.coords[0], item.coords[1])}>
                  <div className="place-info">
                    <img src={item.image} alt="" />
                    <div className="place-content">
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                    </div>
                  </div>

                  <button onClick={(event) => toggleLike(key,event)}>
                    <FontAwesomeIcon icon={item.liked ? heartSolid : heartRegular}/>
                  </button> 
                </article>
              ))}
            </div>
            )}

            {getPage === "favorite" && (
            <div className="favorite">
              <p>Нету избранных мест</p>
            </div>
            )}

            {getPage === "profile" && (
            <div className="profile">
              <div className="profile-user">
                <div className="profile-user-card">
                  <img src="https://i.pinimg.com/1200x/41/e9/20/41e92004ca4c93d08b8dc33583cb9751.jpg" alt="pfp.jpg" />
                  <div className="profile-user-info">
                    <h1>Username</h1>
                    <p>???</p>
                  </div>
                </div>

                <button onClick={() => setSettingsVisible(true)}>
                  <FontAwesomeIcon icon={faCog}/>
                </button>
              </div>
            </div>
            )}

          </section>
        </header>

        <div className="map-control">
          <button onClick={() => mapZoom(true)}><FontAwesomeIcon icon={faPlus}/></button>
          <button onClick={() => mapZoom(false)}><FontAwesomeIcon icon={faMinus}/></button>
        </div>
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