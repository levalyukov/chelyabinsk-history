import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Licences {
  [index:number]: Licence;
};

export interface Licence {
  title:string;
  license:string;
  icon:IconDefinition;
  href:string;
};