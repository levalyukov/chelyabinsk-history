export interface Places {
  [index:number]: PlaceContent
};

export interface PlaceContent {
  image:string;
  title:string;
  description:string;
  coords:[number,number];
  popup: PlacePopup;
  liked?:boolean;
};

export interface PlacePopup {
  image:string;
  title:string;
  description:string;
  address:string;
  schedule?:[string,string,string,string,string,string,string] | string;
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
      address: "Центральный район, Улица Кирова",
      schedule: "Круглосуточно"
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
      address: "Центральный район, Коммуны 100",
      schedule: "Круглосуточно"
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
      schedule: "11:00 – 22:00"
    }
  },
};