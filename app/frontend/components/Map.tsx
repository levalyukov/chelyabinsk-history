import "../styles/Map.css"
import "maplibre-gl/dist/maplibre-gl.css";

import { useContext, useEffect, useRef} from "react";
import maplibregl from "maplibre-gl";
import MapPopup from "./modals/MapPopup";
import { AppContext } from "../interfaces/reports.provider";
import { Map as MapLibre } from "maplibre-gl";
import { createRoot } from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { type Places } from "../interfaces/reports.interface";
import { type StyleSpecification } from 'maplibre-gl';

import mapDarkRaw from "../styles/map-dark.json"
import mapLightRaw from "../styles/map-light.json"

export default function Map({theme, setMap}: 
  {setMap:(map:MapLibre | null) => void, theme:boolean}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const context = useContext(AppContext);
  const mapDark = mapDarkRaw as unknown as StyleSpecification;
  const mapLight = mapLightRaw as unknown as StyleSpecification;
  if (!context) {
    return (
      <section id="map-container" className="error">
        <span><FontAwesomeIcon icon={faFaceFrown}/></span>
        <h2>Ой-ой!</h2>
        <p>Критическая ошибка при загрузке карты.</p>
      </section>
    );
  };
  
  const { appPlaces } = context;
  useEffect(() => {
    if (!mapContainer.current) return;

    const map:MapLibre | null = new maplibregl.Map({
      container: mapContainer.current,
      style: theme ? mapDark : mapLight,
      center: [61.4025, 55.1599],
      maxZoom: 18,
      minZoom: 10,
      zoom: 11,
      maxBounds: [[61.1340, 55.0116],[61.6443, 55.3217]],

      dragPan: true,
      boxZoom: false,
      keyboard: false,
      scrollZoom: true,
      doubleClickZoom: true,
    });

    setMap(map);
    initMarkersPlaces({map, appPlaces});

    map.addControl(new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: false,
      visualizePitch: true
    }), "top-right");


    if (navigator.permissions) {
      navigator.permissions.query({name: 'geolocation'}).then((result) => {
        switch (result.state) {
          case "granted":
            navigator.geolocation.getCurrentPosition(
              (position) => setUserMarker({map, position}),
              (error) => console.error("Geolocation API error: ", error),
              {
                enableHighAccuracy: true,
                timeout: 16000,
                maximumAge: Infinity
              } 
            ); break;
        };
      });
    };

    return () => map.remove();
  }, [theme]);

  return (
    <section id="map-container">
      <div className="map" ref={mapContainer}/>
    </section>
  );  
};

function initMarkersPlaces({map, appPlaces}: {
  map: maplibregl.Map | null, 
  appPlaces:Places
}):void {
  if (map) {
    if (appPlaces) {
      for (let i = Number(Object.keys(appPlaces)[0]); i <= Object.keys(appPlaces).length; i++) {
        if (appPlaces[i]) {
          const markerEl = document.createElement("div");
          const popupNode = document.createElement("div");
          const popupRender = createRoot(popupNode);
          const popup = new maplibregl.Popup({ 
            offset: [0, -20], 
            anchor: "bottom"
          }).setDOMContent(popupNode);

          markerEl.className = "marker";
          popupRender.render(<MapPopup place={appPlaces[i]}/>);
          popup.on("open", () => {
            const closeBtn = popup.getElement().querySelector(".maplibregl-popup-close-button");
            if (closeBtn) {
              closeBtn.innerHTML = ""; 
              const root = createRoot(closeBtn);
              root.render(<FontAwesomeIcon icon={faClose} />);
              popup.on("close", () => root.unmount());
            };
          });

          const marker = new maplibregl.Marker({ element: markerEl })
          .setLngLat([appPlaces[i].coords[1], appPlaces[i].coords[0]])
          .setPopup(popup)
          .addTo(map);

          if (appPlaces[i].marker === undefined) 
            appPlaces[i].marker = marker;
        };
      };
    };
  };
};

export function setUserMarker({map, position}: 
  {map: maplibregl.Map | null, position:GeolocationPosition}) {
  if (map) {
    const userMarker = document.createElement("div");
    userMarker.className = "user-marker";
    new maplibregl.Marker({ element: userMarker })
    .setLngLat([position.coords.longitude, position.coords.latitude])
    .addTo(map);
  } else console.error("Map is invalid:", map);
};