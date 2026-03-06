import maplibregl from 'maplibre-gl';
import { useState, useEffect, useRef} from "react";

import "maplibre-gl/dist/maplibre-gl.css";
import "../styles/Map.css"

import MarkerIcon from "../images/marker.svg"

export default function Map({setMap}: {setMap:(map:null) => void}) {

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.versatiles.org/assets/styles/colorful/style.json',
      center: [61.4, 55.15],
      zoom: 9
    });

    return () => map.remove();
  }, []);

  const mapContainer = useRef<HTMLDivElement>(null);

  return (
    <section className='map'>
      <div className="leaflet-container">
        <div ref={mapContainer} style={{width: '100%', height: '100vh'}}/>
      </div>
    </section>
  );  
};