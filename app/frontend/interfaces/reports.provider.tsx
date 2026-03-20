import React, { useMemo, useState } from 'react';
import { type PlaceContent, type Places, placesStore } from './reports.interface';

export interface PlacesProviderContext {
  appPlaces: Places;
  toggleLike: (key:string, event:React.MouseEvent) => void;
  closeAllPopup: () => void;
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

  function closeAllPopup():void {
    setPlaces((currentPlaces: Places) => {
      if (!currentPlaces) return {} as Places;

      Object.values(currentPlaces).forEach((item: PlaceContent) => {
        const marker = item.marker;
        if (marker) {
          if (marker.getPopup().isOpen()) {
            marker.togglePopup();
          };
        };
      });
      
      return { ...currentPlaces };
    });
  };

  const value = useMemo(() => ({
    appPlaces: place,
    toggleLike: setToggleLike,
    closeAllPopup: closeAllPopup
  }), [place, setToggleLike]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};