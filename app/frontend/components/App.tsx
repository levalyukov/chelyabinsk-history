import "../styles/App.css"

import Header   from "./Header"
import Profile  from "./Profile"
import Favorite from "./Favorite"
import Map from "./Map"

import { useState } from "react";

export default function App() {
  const [menuState, setMenuState] = useState<"map" | "favorite" | "profile">("map");
  
  return (
    <>
      <Header setPage={setMenuState} getPage={menuState}/>
      {menuState === "map" && <Map/>}
      {menuState === "favorite" && <Favorite/>}
      {menuState === "profile" && <Profile/>}
    </>
  );
};