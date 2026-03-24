import kirovka from "../images/places/kirovka.jpg";
import opera from "../images/places/opera.jpg";
import center from "../images/places/center.jpg";

interface LandingPlaces {
  [item:number]: LandingPlaceContent;
};

interface LandingPlaceContent {
  readonly name:string;
  readonly image:string;
  readonly description:string;
};

export const places:LandingPlaces = {
  0: {
    name: "Кировка",
    image: kirovka,
    description: "Главная пешеходная улица Челябинска с историческими зданиями и скульптурами",
  },
  1: {
    name: "Театр оперы и балета",
    image: opera,
    description: "Государственный академический театр оперы и балета им. М.И. Глинки",
  },
  2: {
    name: "Исторический центр",
    image: center,
    description: "Панорама исторического центра Челябинска с набережной реки Миасс",
  },
};