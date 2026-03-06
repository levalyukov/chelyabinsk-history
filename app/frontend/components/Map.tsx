import maplibregl from 'maplibre-gl';
import { useState, useEffect, useRef} from "react";

import "maplibre-gl/dist/maplibre-gl.css";
import "../styles/Map.css"

import MarkerIcon from "../images/marker.svg"

export default function Map({setMap}: {setMap:(map:null) => void}) {
  // const mapBounds:number[][]= [[55.316877, 61.184491],[55.028634,61.661413]];
  // const retina = (window.devicePixelRatio === 1) ? false : true;
  // const icon = new L.Icon({
  //   iconUrl: MarkerIcon,
  //   iconSize: [48, 48],
  //   iconAnchor: [16, 48],
  //   popupAnchor: [8, -48],
  // });

  // function MapComponent({setMap}:{setMap:(map:Leaflet | null) => void}) {
  //   const map = useMap();
  //   useEffect(() => {
  //     setMap(map);
  //   }, [map, setMap]);
  //   return null;
  // };

  // function MapBoundsComponent() {
  //   const map = useMap();
  //   const [bounds, setBounds] = useState(map.getBounds());

  //   useMapEvents({
  //     moveend: () => {
  //       const currentBounds = map.getBounds();
  //       setBounds(currentBounds);
  //     },
  //   }); return null;
  // };

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