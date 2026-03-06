import { MapContainer, Marker, TileLayer, useMap, useMapEvents, Popup} from 'react-leaflet'
import { Map as Leaflet } from 'leaflet'; 
import * as L from 'leaflet';
import { useState, useEffect} from "react";
import 'leaflet/dist/leaflet.css';
import "../styles/Map.css"

import MarkerIcon from "../images/marker.svg"

export default function Map({setMap}: {setMap:(map:Leaflet | null) => void}) {
  const mapBounds:any = [[55.316877, 61.184491],[55.028634,61.661413]];
  const retina = (window.devicePixelRatio === 1) ? false : true;
  const icon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [48, 48],
    iconAnchor: [16, 48],
    popupAnchor: [8, -48],
  });

  function MapComponent({setMap}:{setMap:(map:Leaflet | null) => void}) {
    const map = useMap();
    useEffect(() => {
      setMap(map);
    }, [map, setMap]);
    return null;
  };

  function MapBoundsComponent() {
    const map = useMap();
    const [bounds, setBounds] = useState(map.getBounds());

    useMapEvents({
      moveend: () => {
        const currentBounds = map.getBounds();
        setBounds(currentBounds);
      },
    }); return null;
  };


  return (
    <section className='map'>
      <div className="leaflet-container">
        <MapContainer 
          center={[55.160, 61.401]} 
          zoomSnap={.5} 
          zoom={13}
          // minZoom={11}
          // maxZoom={18} 
          scrollWheelZoom={true} 
          attributionControl={false}
          // maxBounds={mapBounds}
          // maxBoundsViscosity={1.0}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" detectRetina={retina} />
          <MapBoundsComponent/>
          <MapComponent setMap={setMap}/>

          <Marker position={[55.160, 61.401]} icon={icon}>
            <Popup>
              
              <div className='popup-content'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F_%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%B0_%D1%81_%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC_%282021%29.jpg" alt="" />
                <span className='popup-marker-content'>
                  <h2>Lorem Ipsum</h2>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, qui error fugit ipsam, beatae aspernatur vitae excepturi nostrum porro ea vel in aliquam repellendus odit amet harum laborum laudantium ipsum?</p>
                </span>
              </div>

            </Popup>
          </Marker>

        </MapContainer>
      </div>
    </section>
  );  
};