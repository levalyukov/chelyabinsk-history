import "../styles/App.css"

import { Map as Leaflet } from 'leaflet'; 
import { useEffect, useState } from "react";

import Header   from "./Header"
import Profile  from "./Profile"
import Favorite from "./Favorite"
import Map      from "./Map"

export default function App() {
  const [map, setMap] = useState<Leaflet | null>(null);
  const [menuState, setMenuState] = useState<"map" | "favorite" | "profile">("map");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener(
      "resize", () => setWidth(window.innerWidth)
    );
  }, []);

  if (width <= 1000) {
    return (
      <>
        <Header map={map} setPage={setMenuState} getPage={menuState}/>
        {menuState === "map" && <Map setMap={setMap}/>}
        {menuState === "favorite" && <Favorite/>}
        {menuState === "profile" && <Profile/>}
      </>
    );
  } else {
    return (
      <>
        <Header map={map} setPage={setMenuState} getPage={menuState}/>
        <Map setMap={setMap}/>
      </>
    );
  };
};