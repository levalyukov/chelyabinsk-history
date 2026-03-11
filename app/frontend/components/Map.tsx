import maplibregl from 'maplibre-gl';
import {Map as AppMain} from 'maplibre-gl';
import { useEffect, useRef} from "react";
import { createRoot } from 'react-dom/client';

import "maplibre-gl/dist/maplibre-gl.css";
import "../styles/Map.css"

import MapPopup from './MapPopup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons';

export interface Place {
  [item:number]: {
    title:string,           // Название места, ограничен 32 символами.
    description:string,     // Описание места, ограничено 128 символами
    image:string,           // Ссылка на картинку
    coords?:number[][],     // Долгота и широта   (опционально)
    address?:string,        // Адрес места        (опционально)
    schedule?:string        // Расписание         (опционально)
  };
};

export default function Map({theme, setMap}: 
  {setMap:(map:AppMain | null) => void, theme:boolean}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapContainer.current) return;
    
    let mapTheme = theme 
    ? 'https://tiles.versatiles.org/assets/styles/eclipse/style.json' 
    : 'https://tiles.versatiles.org/assets/styles/colorful/style.json';

    const map:AppMain | null = new maplibregl.Map({
      container: mapContainer.current,
      style: mapTheme,
      center: [61.4025, 55.1599],
      maxZoom: 18,
      minZoom: 10,
      zoom: 11,
      maxBounds: [
        [61.1340, 55.0116],
        [61.6443, 55.3217]
      ],

      dragPan: true,
      boxZoom: false,
      keyboard: false,
      scrollZoom: true,
      doubleClickZoom: true,
    });

    setMap(map);
    initMarkers({map});

    map.addControl(new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: false,
      visualizePitch: true
    }), "top-right");

    return () => map.remove();
  }, [theme]);

  return (
    <section className='map'>
      <div ref={mapContainer} style={{width: '100%', height: '100vh'}}/>
    </section>
  );  
};

function initMarkers({map}:{map:maplibregl.Map | null}):void {
  if (map) {
    const markerEl = document.createElement('div');
    markerEl.className = 'marker';

    const popupNode = document.createElement('div');
    const popupRender = createRoot(popupNode);
    const popup = new maplibregl.Popup({ offset: 20 }).setDOMContent(popupNode);

    popupRender.render(<MapPopup/>);
    popup.on('open', () => {
      const closeBtn = popup.getElement().querySelector('.maplibregl-popup-close-button');
      if (closeBtn) {
        closeBtn.innerHTML = ''; 
        const root = createRoot(closeBtn);
        root.render(<FontAwesomeIcon icon={faClose} />);

        popup.on('close', () => root.unmount());
      };
    });

    new maplibregl.Marker({ element: markerEl })
      .setLngLat([61.40065, 55.163917])
      .setPopup(popup)
      .addTo(map);
  };
};