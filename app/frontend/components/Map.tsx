import { MapContainer, Marker, TileLayer, useMap, useMapEvents, Popup} from 'react-leaflet'
import * as L from 'leaflet';
import { useState, useEffect} from "react";
import 'leaflet/dist/leaflet.css';
import "../styles/Map.css"

import { Map as Leaflet } from 'leaflet'; 

import MarkerIcon from "../images/marker.svg"

export default function Map({setMap}: {setMap:(map:Leaflet | null) => void}) {
  const retina = (window.devicePixelRatio === 1) ? false : true;
  const icon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [64, 64],
    iconAnchor: [16, 32],
    popupAnchor: [16, -32],
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
        console.log(bounds);
        setBounds(currentBounds);
      },
    });

    return null;
  };

  return (
    <section className='map'>
      <div className="leaflet-container">
        <MapContainer center={[55.160, 61.401]} zoomSnap={.5} zoom={13} scrollWheelZoom={true} attributionControl={false}>
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

          <Marker position={[55.165097, 61.364797]} icon={icon}>
            <Popup>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ut fuga, fugiat, beatae doloremque necessitatibus non minus deleniti assumenda labore quaerat in perferendis nisi iusto sit! Ipsam odit numquam animi?
            </Popup>
          </Marker>

          <Marker position={[55.1564750, 61.3700180]} icon={icon}>
            <Popup>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ut fuga, fugiat, beatae doloremque necessitatibus non minus deleniti assumenda labore quaerat in perferendis nisi iusto sit! Ipsam odit numquam animi?
            </Popup>
          </Marker>

        </MapContainer>
      </div>
    </section>
  );  
};