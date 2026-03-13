import React, { useState } from 'react';
import { type Places, placesStore } from './PlacesStore';

export interface PlacesProviderContext {
  appPlaces: Places;
  toggleLike: (key:string, event:React.MouseEvent) => void;
};

export const AppContext = React.createContext<PlacesProviderContext | undefined>(undefined);

export function AppProvider({children}: {children: React.ReactNode}) {
  const [place, setPlaces] = useState<Places>(placesStore);
  function setToggleLike(key:string, event:React.MouseEvent):void {
    event.stopPropagation();
    const index = Number(key);
    setPlaces((element) => {
      if (!element[index]) return element;
      return {...element,
        [index]: {
          ...element[index],
          liked: !element[index].liked
      }};
    });
  };
  
  const value:PlacesProviderContext = {
    appPlaces: place,
    toggleLike: setToggleLike
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};