import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useState } from "react";
import 'leaflet/dist/leaflet.css';
import "../styles/Map.css"

export default function Map() {
  const retina = (window.devicePixelRatio === 1) ? false : true;
  // const icon = new L.Icon({
  //   iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2N7J6rpBBuinxCHhQOwRGaCsYf082d5fWw&s",
  //   iconSize: [64, 64],
  //   iconAnchor: [16, 32],
  //   popupAnchor: [16, -32],
  // });

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
        </MapContainer>
      </div>
    </section>
  );  
};