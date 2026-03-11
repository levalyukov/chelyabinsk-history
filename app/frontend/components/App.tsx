import "../styles/App.css"

import { Map as AppMain } from 'maplibre-gl';
import { useEffect, useState } from "react";

import Header   from "./Header"
import Map      from "./Map"
import Favorite from "./Favorite"
import Profile  from "./Profile"

export default function App() {
  const [theme, setAppTheme] = useState<boolean>(false);
  const [map, setMap] = useState<AppMain | null>(null);
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
      () => setWidth(window.innerWidth)
    );

    // Theme
    if (localStorage.getItem("theme")) {
      setAppTheme(localStorage.getItem("theme") === "dark");
      document.documentElement.setAttribute("theme", 
        localStorage.getItem("theme") === "dark" ? "dark" : "light");
    } else localStorage.setItem("theme", "light");
  }, [theme]);

  if (width <= 1000) {
    return (
      <>
        <Header 
          map={map} setPage={setMenuState} 
          getPage={menuState} settingsVisible={settingsVisible}
          setSettingsVisible={setSettingsVisible}
          getAppTheme={theme} setAppTheme={setAppTheme}  
          updateAppTheme={updateAppTheme} screenWidth={width}/>
        {menuState === "map" && <Map setMap={setMap} theme={theme}/>}
        {menuState === "favorite" && <Favorite/>}
        {menuState === "profile" && <Profile setSettings={setSettingsVisible}/>}
      </>
    );
  } else {
    return (
      <>
        <Header 
          map={map} setPage={setMenuState} 
          getPage={menuState} settingsVisible={settingsVisible}
          setSettingsVisible={setSettingsVisible}
          getAppTheme={theme} setAppTheme={setAppTheme}  
          updateAppTheme={updateAppTheme} screenWidth={width}/>
        <Map setMap={setMap} theme={theme}/>
      </>
    );
  };
};