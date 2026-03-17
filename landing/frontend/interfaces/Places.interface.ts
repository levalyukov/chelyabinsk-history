interface LandingPlaces {
  [item:number]: LandingPlaceContent;
};

interface LandingPlaceContent {
  readonly name:string;
  readonly image:string;
  readonly description:string;
};

export const places:LandingPlaces = {};