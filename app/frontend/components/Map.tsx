import "../styles/Map.css"
import "maplibre-gl/dist/maplibre-gl.css";

import { useContext, useEffect, useRef, useState} from "react";
import maplibregl from "maplibre-gl";
import MapPopup from "./modals/MapPopup";
import UserGeoPopup from "./modals/UserGeoPopup";
import { AppContext } from "../interfaces/reports.provider";
import { Map as MapLibre } from "maplibre-gl";
import { createRoot } from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { type Places } from "../interfaces/reports.interface";
import { type StyleSpecification } from 'maplibre-gl';
import MapLibreGLDirection from "@maplibre/maplibre-gl-directions"

import mapDarkRaw from "../styles/map-dark.json"
import mapLightRaw from "../styles/map-light.json"

export default function Map ({theme, setMap, setReportView}: {
  theme:boolean,
  setMap:(map:MapLibre | null) => void,
  setReportView: (id:number) => void
}) : React.ReactNode {
  const mapContainer = useRef<HTMLDivElement>(null);
  const context = useContext(AppContext);
  const mapDark = mapDarkRaw as unknown as StyleSpecification;
  const mapLight = mapLightRaw as unknown as StyleSpecification;
  const [userLocation, setUserLocation] = useState<[number,number]>([0,0]);

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

    map.on("load", () => {
      setMap(map);
      initMarkersPlaces({map, appPlaces, setReportView});

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
                (position) => {
                  setUserMarker({map, position});
                  setUserLocation([position.coords.longitude, position.coords.latitude]);
                },

                (error) => console.error("Geolocation API error: ", error),
                {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: Infinity
                } 
              ); break;
          };
        });
      };
    });

    return () => map.remove();
  }, [theme]);

  return (
    <section id="map-container">
      <div className="map" ref={mapContainer}/>
    </section>
  );  
};

function initMarkersPlaces ({map, appPlaces, setReportView}: {
  map: maplibregl.Map | null, 
  appPlaces:Places,
  setReportView: (id:number) => void
}) : void {
  if (map) {
    if (appPlaces) {
      for (let i = Number(Object.keys(appPlaces)[0]); i <= Object.keys(appPlaces).length; i++) {
        if (appPlaces[i]) {
          const markerEl = document.createElement("div");
          const popupNode = document.createElement("div");
          const popupRender = createRoot(popupNode);
          const popup = new maplibregl.Popup()
          .setDOMContent(popupNode);

          markerEl.className = "marker";
          popupRender.render(<MapPopup  place={appPlaces[i]} placeID={i} setReportView={setReportView}/>);
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

export function setUserMarker ({map, position}: 
  {map: maplibregl.Map | null, position:GeolocationPosition}) {
  if (map) {
    const popupNode = document.createElement("div");
    const popupRender = createRoot(popupNode);
    const popup = new maplibregl.Popup({
      offset: [0, -18],
      anchor: "bottom",
      className: "user-geo-popup"
    }).setDOMContent(popupNode);
    popupRender.render(<UserGeoPopup/>);

    popup.on("open", () => {
      const closeBtn = popup.getElement().querySelector(".maplibregl-popup-close-button");
      if (closeBtn) {
        closeBtn.innerHTML = ""; 
        const root = createRoot(closeBtn);
        root.render(<FontAwesomeIcon icon={faClose} />);
        popup.on("close", () => root.unmount());
      };
    });

    const userMarker = document.createElement("div");
    userMarker.className = "user-marker";
    new maplibregl.Marker({ element: userMarker })
    .setLngLat([position.coords.longitude, position.coords.latitude])
    .setPopup(popup)
    .addTo(map);
  } else console.error("Map is invalid:", map);
};

function MapRouter ({map, userLocation, theme}:
  {map:maplibregl.Map|null, userLocation:[number,number], theme:boolean}) : void {
  if (!map) {
    console.error("map error: ", map);
    return;
  }

  const direction = new MapLibreGLDirection(map, {
    layers: [
        {
            id: "routeline",
            type: "line",
            source: "maplibre-gl-directions",
            layout: {
                "line-cap": "round",
                "line-join": "round",
                "visibility": "visible",
            },
            paint: {
                "line-color": !theme ? "#FF9E89" : "#EB775E",
                "line-width": 6,
                "line-opacity": 1,
            },
            filter: ["==", "route", "SELECTED"],
        }
    ],
  });

  direction.interactive = false;
  direction.setWaypoints([userLocation, [61.40195,55.166625]]);
};