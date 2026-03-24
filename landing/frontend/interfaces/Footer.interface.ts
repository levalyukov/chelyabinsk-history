import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Footer {
  readonly authors:FooterAuthors;
  readonly content:FooterContent;
  readonly media?:FooterSocialMedia;
};

interface FooterAuthors {
  created:string
};

export interface FooterContent{
  [item:number]: FooterBlock;
};

interface FooterBlock {
  readonly title:string;
  readonly items: {
    [item:number]: FooterLinks
  };
};

export interface FooterLinks {
  readonly name:string;
  readonly icon?:IconDefinition;

  readonly href?:string;
  readonly lambda?: () => void;
};

export interface FooterSocialMedia {
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