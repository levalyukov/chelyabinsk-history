import { type Marker } from "maplibre-gl";

export interface Places {
  [index:number]: PlaceContent
};

export interface PlaceContent {
  readonly image:string;
  readonly title:string;
  readonly description:string;
  readonly coords:[number,number];
  readonly popup: PlacePopup;
  marker?:Marker;
  liked?:boolean;
};

export interface PlacePopup {
  readonly image:string;
  readonly title:string;
  readonly description:string;
  readonly address:string;
  readonly schedule?:[
    PlaceSchedule,PlaceSchedule,PlaceSchedule,
    PlaceSchedule,PlaceSchedule,PlaceSchedule,
    PlaceSchedule
  ];
};

export interface PlaceSchedule {
  readonly openHours:number;
  readonly openMinutes:number;
  readonly closeHours:number;
  readonly closeMinutes:number;
  readonly dayoff?:boolean
};

export let placesStore:Places = {
  0: {
    image: "https://chelyabinsk-love.ru/wp-content/uploads/2022/04/KMO_160860_00027_1_t218_182800.jpeg",
    title: "Кировка",
    description: "Пешеходная часть улицы Кирова в Челябинске.",
    coords: [55.163917, 61.40065],
    popup: {
      image: "https://chelyabinsk-love.ru/wp-content/uploads/2022/04/KMO_160860_00027_1_t218_182800.jpeg",
      title: "Пешеходная улица «Кировка»",
      description: "Кировка — пешеходная часть улицы Кирова в Челябинске, ставшая одной из главных достопримечательностей города.",
      address: "Центральный район, Улица Кирова"
    }
  },

  1: {
    image: "https://chel.dk.ru/system/images/news/000/956/432_x_large_new_origin_copyright.jpg",
    title: "Парк Гагарина",
    description: "Главное место отдыха в сосновом бору в центре города.",
    coords: [55.165097, 61.364797],
    popup: {
      image: "https://chel.dk.ru/system/images/news/000/956/432_x_large_new_origin_copyright.jpg",
      title: "Парк Гагарина",
      description: "главное место отдыха в сосновом бору в центре города. Он предлагает аттракционы (колесо обозрения, «Гулливер»), «Лесной экстрим», прокат лодок/велосипедов, фонтан «Счастье», контактный зоопарк, зимой — каток и лыжную базу",
      address: "Центральный район, Коммуны 100"
    }
  },

  2: {
    image: "https://n1s1.hsmedia.ru/55/c6/c1/55c6c1056736ea4a585276947bf46cb8/656x369_1_78921a5a9ea226e3bf588382840b157d@960x540_0xOhcn6zXI_8091120617152733728.jpg.webp",
    title: "Белый Рынок",
    description: "Главное место отдыха в сосновом бору в центре города.",
    coords: [55.156002, 61.369973],
    popup: {
      image: "https://n1s1.hsmedia.ru/55/c6/c1/55c6c1056736ea4a585276947bf46cb8/656x369_1_78921a5a9ea226e3bf588382840b157d@960x540_0xOhcn6zXI_8091120617152733728.jpg.webp",
      title: "Гастромаркет «Белый рынок»",
      description: "Атмосферное место, где можно вкусно покушать с разнообразной кухней на любой вкус!",
      address: "ул. Тернопольская, 6",
      schedule: [
        {openHours: 11, openMinutes: 0, closeHours: 22, closeMinutes: 0},
        {openHours: 11, openMinutes: 0, closeHours: 22, closeMinutes: 0},
        {openHours: 11, openMinutes: 0, closeHours: 22, closeMinutes: 0},
        {openHours: 11, openMinutes: 0, closeHours: 22, closeMinutes: 0},
        {openHours: 11, openMinutes: 0, closeHours: 23, closeMinutes: 0},
        {openHours: 11, openMinutes: 0, closeHours: 23, closeMinutes: 0},
        {openHours: 11, openMinutes: 0, closeHours: 22, closeMinutes: 0, dayoff: true},
      ]
    }
  },
};