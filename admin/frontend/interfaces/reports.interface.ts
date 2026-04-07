import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { type HexColor, type AppPages } from "../interfaces/app.interface";

export interface AdminButtons {
  [index:number]: AdminButton;
};

export interface AdminButton {
  title:string;
  icon:IconDefinition;
  iconColor?:HexColor;
  page:AppPages;
};

export const buttons:AdminButtons = {
  0: {
    title: "Добавить репортаж",
    icon:  faSquarePlus,
    iconColor: "#78F58F",
    page: "addReport"
  },

  1: {
    title: "Редактировать репортаж",
    icon:  faPenToSquare,
    iconColor: "#57AEFF",
    page: "changeReport"
  },

  2: {
    title: "Удалить репортаж",
    icon:  faTrashCan,
    iconColor: "#FF5A5A",
    page: "deleteReport"
  }
};

export interface AllReports {
  [index:number]: Report;
};


export interface Report {
  image:string;
  title:string;
  description:string;
  coords:[number,number];
}