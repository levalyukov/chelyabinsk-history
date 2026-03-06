import "../styles/Reports.css"

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
    liked:boolean
  };
};

export default function Reports({map}: {map:null | null}) {
  const places:PlaceData = {
    0: {
      image: "https://towntravel.ru/wp-content/uploads/2014/07/7880-%D0%A3%D0%BB%D0%B8%D1%86%D0%B0-%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D0%B0.-%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%D0%BC-%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%B0-1024x682.jpg",
      title: "Кировка",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam accusantium quae aliquam?",
      coords: [55.160, 61.401],
      liked: false
    },
    
    1: {
      image: "https://images.fooby.ru/1/40/16/1957565",
      title: "Парк Гагарина",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam accusantium quae aliquam?",
      coords: [55.165097, 61.364797],
      liked: false
    },
    
    2: {
      image: "https://n1s1.hsmedia.ru/55/c6/c1/55c6c1056736ea4a585276947bf46cb8/656x369_1_78921a5a9ea226e3bf588382840b157d@960x540_0xOhcn6zXI_8091120617152733728.jpg.webp",
      title: "Белый Рынок",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam accusantium quae aliquam?",
      coords: [55.1564750, 61.3700180],
      liked: false
    }
  };

  const [place, setPlaces] = useState<PlaceData>(places);

  function setMapPosition(lat:number, lng:number):void {
    // if (map) map.flyTo([lat,lng], 17);
  };

  function setToggleLike(key:string, event: React.MouseEvent):void {
    event.stopPropagation();
    const index = Number(key);
    setPlaces((element) => {
      if (!element[index]) return element;

      return {
        ...element,
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
        <article key={key} onClick={() => setMapPosition(item.coords[0], item.coords[1])}>
          <div className="place-info">
            <img src={item.image} alt="" />
            <div className="place-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
          <button onClick={(event) => setToggleLike(key,event)}>
            <FontAwesomeIcon icon={item.liked ? heartSolid : heartRegular}/>
          </button> 
        </article>
      ))}
    </div>
  );
};