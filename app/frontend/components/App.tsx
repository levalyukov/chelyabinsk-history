import "../styles/App.css"

import { AppProvider } from "../interfaces/reports.provider";
import { Map as MapLibre } from "maplibre-gl";
import { useEffect, useState } from "react";

import Map      from "./Map"
import Header   from "./Header"
import Favorite from "./Favorite"

export default function App() {
  const [theme, setAppTheme] = useState<boolean>(false);
  const [map, setMap] = useState<MapLibre | null>(null);
  const [menuState, setMenuState] = useState<"map" | "favorite" | "profile">("map");
  const [width, setWidth] = useState(window.innerWidth);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  function updateAppTheme():void {
    if (localStorage.getItem("theme")) {
      document.documentElement.setAttribute("theme", !theme ? "dark" : "light");
      localStorage.setItem("theme", !theme ? "dark" : "light");
    } else localStorage.setItem("theme", "light");
  };

  useEffect(() => {
    window.addEventListener("resize", 
      () => setWidth(window.innerWidth));

    let page:string = "";
    if (menuState === "map")      page = "Карта";
    if (menuState === "favorite") page = "Избранное";
    if (menuState === "profile")  page = "Профиль";
    document.title = "Экскурсия с доставкой: " + page;

    if (localStorage.getItem("theme")) {
      setAppTheme(localStorage.getItem("theme") === "dark");
      document.documentElement.setAttribute("theme", 
        localStorage.getItem("theme") === "dark" ? "dark" : "light");
    } else localStorage.setItem("theme", "light");

    const favoriteRaw = localStorage.getItem("favorite");
    if (favoriteRaw) {
      const savedStore = JSON.parse(favoriteRaw);
      console.log(savedStore)
    };
  }, [theme, menuState]);

  return (
    <AppProvider>
      <Header 
        map={map} setPage={setMenuState} 
        getPage={menuState} settingsVisible={settingsVisible}
        setSettingsVisible={setSettingsVisible}
        getAppTheme={theme} setAppTheme={setAppTheme}  
        updateAppTheme={updateAppTheme} screenWidth={width}/>

      <div style={{ display: (menuState === "favorite" && width <= 1000) ? "block" : "none" }}>
        <Favorite map={map} screenWidth={width} setPage={setMenuState} appPage={menuState}/>
      </div>

      <div style={{ display: (menuState === "map" || width > 1000) ? "block" : "none" }}>
        <Map setMap={setMap} theme={theme}/>
      </div>
    </AppProvider>
  );
};