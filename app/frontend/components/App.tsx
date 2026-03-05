import "../styles/App.css"

import { Map as Leaflet } from 'leaflet'; 
import { useEffect, useState } from "react";

import Header   from "./Header"
import Map      from "./Map"
import Reports  from "./Reports"
import Favorite from "./Favorite"
import Profile  from "./Profile"

export default function App() {
  const [map, setMap] = useState<Leaflet | null>(null);
  const [menuState, setMenuState] = useState<"map" | "favorite" | "profile">("map");
  const [width, setWidth] = useState(window.innerWidth);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener(
      "resize", () => setWidth(window.innerWidth)
    );
  }, []);

  if (width <= 1000) {
    return (
      <>
        <Header 
          map={map} setPage={setMenuState} 
          getPage={menuState} control={false}
          settingsVisible={settingsVisible}
          setSettingsVisible={setSettingsVisible}/>
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
          setSettingsVisible={setSettingsVisible}/>
        <Map setMap={setMap}/>
      </>
    );
  };
};