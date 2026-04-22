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

  3: {
    name: "Памятник И.В. Курчатову",
    image: "https://cheltoday.ru/upload/iblock/850/v_chelyabinske_po_novomu_osvetili_pamyatnik_igoryu_kurchatovu.jpg",
    description: "Выдающийся физик, основоположник советской атомной программы",
  },

  4: {
    name: "«Белый рынок»",
    image: "https://n1s1.hsmedia.ru/55/c6/c1/55c6c1056736ea4a585276947bf46cb8/656x369_1_78921a5a9ea226e3bf588382840b157d@960x540_0xOhcn6zXI_8091120617152733728.jpg.webp",
    description: "Атмосферное место, где можно вкусно покушать!",
  },

  5: {
    name: "Парк Гагарина",
    image: "https://chel.dk.ru/system/images/news/000/956/432_x_large_new_origin_copyright.jpg",
    description: "Главное место отдыха в сосновом бору в центре города",
  }
};