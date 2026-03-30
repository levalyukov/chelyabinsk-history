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
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4d/b9/92/houses.jpg?w=900&h=500&s=1",
    title: "Немецкий Квартал",
    description: "Уникальный островок малоэтажной европейской застройки середины 1940-х годов.",
    coords: [55.253676, 61.39424],
    popup: {
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4d/b9/92/houses.jpg?w=900&h=500&s=1",
      title: "Немецкий Квартал",
      description: "Исторический ансамбль из 30 малоэтажных домов, построенных в 1944–1946 годах пленным немцами и трудармейцами для инженеров ЧМЗ.",
      address: "Металлургический район, Улица Социалистическая"
    }
  },

  1: {
    image: "https://chelyabinsk-love.ru/wp-content/uploads/2022/04/KMO_160860_00027_1_t218_182800.jpeg",
    title: "Кировка",
    description: "Пешеходная часть улицы Кирова в Челябинске.",
    coords: [55.163917, 61.40065],
    popup: {
      image: "https://chelyabinsk-love.ru/wp-content/uploads/2022/04/KMO_160860_00027_1_t218_182800.jpeg",
      title: "Пешеходная улица \"Кировка\"",
      description: "Кировка - пешеходная часть улицы Кирова в Челябинске, ставшая одной из главных достопримечательностей города.",
      address: "Центральный район, Улица Кирова"
    }
  },

  2: {
    image: "https://chel.dk.ru/system/images/news/000/956/432_x_large_new_origin_copyright.jpg",
    title: "Парк Гагарина",
    description: "Главное место отдыха в сосновом бору в центре города.",
    coords: [55.165097, 61.364797],
    popup: {
      image: "https://chel.dk.ru/system/images/news/000/956/432_x_large_new_origin_copyright.jpg",
      title: "Парк Гагарина",
      description: "Центр отдыха в сосновом бору. Аттракционы: колесо обозрения, «Гулливер», «Лесной экстрим». Прокат лодок и велосипедов. Фонтан «Счастье», контактный зоопарк. Зимой — каток и лыжная база.",
      address: "Центральный район, Коммуны 100"
    }
  },

  3: {
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

  4: {
    image: "https://fs.tonkosti.ru/c0/9i/c09i5mz1crw4004osw0wosgs8.jpg",
    title: "Театр oперы и балета",
    description: "Ведущая оперная сцена Южного Урала.",
    coords: [55.166625, 61.40195],
    popup: {
      image: "https://cdn.culture.ru/images/63b28e2f-58c4-58d2-8441-87e388ce49e1",
      title: "Театр oперы и балета",
      description: "Одна из главных музыкальных сцен Урала. Открыт в 1956 году. В репертуаре - русская и зарубежная классика, современные постановки.",
      address: "Центральный район, пл. Ярославского 1",
      schedule: [
        {openHours: 10, openMinutes: 0, closeHours: 20, closeMinutes: 0},
        {openHours: 10, openMinutes: 0, closeHours: 20, closeMinutes: 0},
        {openHours: 10, openMinutes: 0, closeHours: 20, closeMinutes: 0},
        {openHours: 10, openMinutes: 0, closeHours: 20, closeMinutes: 0},
        {openHours: 10, openMinutes: 0, closeHours: 20, closeMinutes: 0},
        {openHours: 10, openMinutes: 0, closeHours: 20, closeMinutes: 0},
        {openHours: 10, openMinutes: 0, closeHours: 20, closeMinutes: 0},
      ]
    }
  },

  5: {
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqTeTjWP2NUMRIueeE7-advL2vLHB3s-J4uRvxRwSIeGw8FToil3DyNTpx2fnw_hZ1LLcIjXH1bQILjJGRtYnp6yFkUJNh3iie7vmOSXoyrQ3nN8vBlhu2iI8x-RziW5qEcS12RTA=s680-w680-h510-rw",
    title: "Памятник И.В. Курчатову",
    description: "Выдающийся физик, основоположник советской атомной программы.",
    coords: [55.15934, 61.36286],
    popup: {
      image: "https://chel.guide/sites/default/files/styles/hd_1280x720/public/pubs-images/2023/05/dd113b135460ee654f908aad63bca0ba.jpg.webp?h=12a1b64b&itok=IscjtG8c",
      title: "Памятник Игорю Васильевичу Курчатову",
      description: "Выдающемуся физику, \"отцу\" советского атомного проекта. Монумент в виде стилизованного атома на высоком постаменте - один из символов Челябинска.",
      address: "Центральный район, пр. Ленина 1"
    }
  },
};