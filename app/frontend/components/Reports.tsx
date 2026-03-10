import "../styles/Reports.css"

import { Map as AppMain } from 'maplibre-gl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export interface PlaceData {
  [index:number]: {
    image:string,
    title:string,
    description:string
    coords:[number,number],
    liked?:boolean
  };
};

export default function Reports({map, setMobileMenu, screenWidth}: 
  {map:AppMain | null, setMobileMenu: (state:boolean) => void, screenWidth:number}) {
  const places:PlaceData = {
    0: {
      image: "https://towntravel.ru/wp-content/uploads/2014/07/7880-%D0%A3%D0%BB%D0%B8%D1%86%D0%B0-%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D0%B0.-%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC-%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%B0-1024x682.jpg",
      title: "Кировка",
      description: "Пешеходная часть улицы Кирова в Челябинске, ставшая одной из главных достопримечательностей города.",
      coords: [55.163917, 61.40065]
    }
  };

  const [place, setPlaces] = useState<PlaceData>(places);

  function setMapPosition(lat:number, lng:number):void {
    if (map) {
      map.flyTo({
        center: [lng,lat], 
        zoom: 16,
        pitch: 0,
        bearing: 0
      });
    };
  };

  function setToggleLike(key:string, event: React.MouseEvent):void {
    event.stopPropagation();
    const index = Number(key);
    setPlaces((element) => {
      if (!element[index]) return element;

      return {...element,
        [index]: {
          ...element[index],
          liked: !element[index].liked
        }
      };
    });
  };

  return (
    <div className="place-container">
      {Object.entries(place).map(([key,item]) => (
        <article key={key} onClick={() => {setMapPosition(item.coords[0], item.coords[1]);setMobileMenu(false);}}>
          <div className="place-info">
            <img src={item.image} alt="" />
            <div className="place-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
          <button onClick={(event) => setToggleLike(key,event)}>
            <span><FontAwesomeIcon icon={item.liked ? heartSolid : heartRegular}/></span> 
            {(screenWidth <= 500) && ((item.liked) ? ("В избранном") : ("Добавить в избранное"))}
          </button> 
        </article>
      ))}
    </div>
  );
};