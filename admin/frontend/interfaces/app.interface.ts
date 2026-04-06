import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
type HexColor = `#${string}`;

export interface AdminButtons {
  [index:number]: AdminButton;
};

export interface AdminButton {
  title:string;
  icon:IconDefinition;
  iconColor?:HexColor;
};