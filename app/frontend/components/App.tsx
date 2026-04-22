import "../styles/App.css"

import { AppProvider } from "../interfaces/reports.provider";
import { Map as MapLibre } from "maplibre-gl";
import { useEffect, useState } from "react";

import Map        from "./Map"
import Header     from "./Header"
import Favorite   from "./Favorite"
import ReportView from "./ReportView";

export default function App():React.ReactNode {
  const [theme, setAppTheme] = useState<boolean>(false);
  const [map, setMap] = useState<MapLibre | null>(null);
  const [menuState, setMenuState] = useState<"map" | "favorite">("map");
  const [width, setWidth] = useState(window.innerWidth);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [reportID, setReportID] = useState<number>(0);

  function updateAppTheme () : void {
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
    document.title = "Экскурсия с доставкой: " + page;

    if (localStorage.getItem("theme")) {
      setAppTheme(localStorage.getItem("theme") === "dark");
      document.documentElement.setAttribute("theme", 
        localStorage.getItem("theme") === "dark" ? "dark" : "light");
    } else localStorage.setItem("theme", "light");
  }, [theme, menuState]);

  return (
    <AppProvider>
      <ReportView setReport={setReportID} id={reportID}/>

      <Header 
        setReportView={setReportID}
        map={map} setPage={setMenuState} 
        getPage={menuState} settingsVisible={settingsVisible}
        setSettingsVisible={setSettingsVisible}
        getAppTheme={theme} setAppTheme={setAppTheme}  
        updateAppTheme={updateAppTheme} screenWidth={width}/>

      <div style={{ 
        display: (menuState === "favorite" && width <= 1000) ? "block" : "none",
        position: "absolute",
        width: "100%",
        height: "100vh"
      }}>
        <Favorite map={map} 
          screenWidth={width} 
          setPage={setMenuState} 
          setReportView={setReportID}
          appPage={menuState}/>
      </div>

      <div style={{ visibility: (menuState === "map" || width > 1000) ? "visible" : "hidden", zIndex: -10 }}>
        <Map setMap={setMap} theme={theme} setReportView={setReportID}/>
      </div>
    </AppProvider>
  );
};