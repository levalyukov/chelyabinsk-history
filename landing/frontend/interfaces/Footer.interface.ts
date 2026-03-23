import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faClock, faEarthAsia, faHammer, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

export interface Footer {
  readonly authors:FooterAuthors;
  readonly content:FooterContent;
  readonly media?:FooterSocialMedia;
};

interface FooterAuthors {
  created:string
};

interface FooterContent{
  [item:number]: FooterBlock;
};

interface FooterBlock {
  readonly links:boolean;
  readonly title:string;
  readonly items: {
    [item:number]: FooterLinks
  };
};

export interface FooterLinks {
  readonly name:string;
  readonly href:string;
  readonly icon?:IconDefinition;
};

interface FooterSocialMedia {
  [index:number]: SocialMedia;
};

interface SocialMedia {
  readonly id:string;
  readonly icon:IconDefinition;
  readonly href:string;
};

export function normalizeLink(href:string):string {
  let normalize:string = "";
  if (!href.startsWith("https://") && !href.startsWith("http://")) normalize = "https://"+href;
  else if (href.startsWith("http://")) normalize = "#";
  else normalize = href;
  return normalize;
};

//! This misunderstanding needs to be changed in a more concise way ! //
export const foo:Footer = {
  authors: {
    created: "Экскурсия с Доставкой"
  },

  content: {
    0: {
      links: false,
      title: "Информация",
      items: {
        0: {
          name: "Город Трудовой Доблести",
          href: "",
          icon: faHammer
        },
        1: {
          name: "1.2 млн жителей",
          href: "",
          icon: faPeopleGroup
        },
        2: {
          name: "Часовой пояс: МСК+2",
          href: "",
          icon: faClock
        },
        3: {
          name: "Основан в 1736 г.",
          href: "",
          icon: faEarthAsia
        },
      }
    },

    1: {
      links: true,
      title: "Продукт",
      items: {
        0: {
          name: "Приложение",
          href: ""
        },
        1: {
          name: "Статус серверов",
          href: ""
        },
        2: {
          name: "Брендбук",
          href: ""
        }
      }
    },

    2: {
      links: true,
      title: "Юридическое",
      items: {
        0: {
          name: "Конфиденциальность",
          href: ""
        },
        1: {
          name: "Лицензии",
          href: ""
        }
      }
    }
  },

  media: {
    0: {
      id: "github",
      icon: faGithub,
      href: "github.com/levalyukov/chelyabinsk-history"
    }
  }
};
//! ---------------------------------------------------- //