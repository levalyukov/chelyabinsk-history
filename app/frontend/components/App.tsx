import "../styles/App.css"

import { useEffect, useState } from "react";

import Header   from "./Header"
import Map      from "./Map"
import Reports  from "./Reports"
import Favorite from "./Favorite"
import Profile  from "./Profile"

export default function App() {
  const [theme, setAppTheme] = useState<boolean>(false);
  const [map, setMap] = useState<null>(null);
  const [menuState, setMenuState] = useState<"map" | "favorite" | "profile">("map");
  const [width, setWidth] = useState(window.innerWidth);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  function updateAppTheme():void {
    console.log("Updated!");
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
  }, []);

  if (width <= 1000) {
    return (
      <>
        <Header 
          map={map} setPage={setMenuState} 
          getPage={menuState} control={false}
          settingsVisible={settingsVisible}
          setSettingsVisible={setSettingsVisible}
          getAppTheme={theme} setAppTheme={setAppTheme}  
          updateAppTheme={updateAppTheme}
        />
        {menuState === "map" && <Map setMap={setMap}/>}
        {menuState === "favorite" && <Favorite/>}
        {menuState === "profile" && <Profile setSettings={setSettingsVisible}/>}
      </>
    );
  } else {
    return (
      <>
        <Header 
          map={map} setPage={setMenuState} 
          getPage={menuState} control={true}
          settingsVisible={settingsVisible}
          setSettingsVisible={setSettingsVisible}
          getAppTheme={theme} setAppTheme={setAppTheme}  
          updateAppTheme={updateAppTheme}
        />
        <Map setMap={setMap}/>
      </>
    );
  };
};