import PageNameEnum from '../../../../enums/page-name.enum';

export type Image = File | string | null;

export type About = {
  icon: string;
  title: string;
  text: string;
  display: boolean;
};

export type Branch = {
  name: string;
  days: string[];
  address: string;
};

export type Partner = {
  image: Image;
  link: string;
};

export type NetworkLink = {
  icon: string;
  link: string;
};

export type Schedule = {
  icon: string;
  label: string;
  date: string;
};

export interface LandingPageData {
  common: {
    bank: string;
    address: string;
    contact: string;
    links: NetworkLink[];
  }
  main: {
    image: Image;
  },
  about: {
    display: boolean;
    title: string;
    items: About[];
  },
  verse: {
    display: boolean;
  },
  branches: {
    display: boolean;
    title: string;
    items: Branch[];
  };
  partners: {
    display: boolean;
    title: string;
    items: Partner[];
  };
  location: {
    display: boolean;
    title: string;
    schedule: Schedule[];
  };
}

export interface AboutPageData {
  text: string;
}

export interface IPage {
  _id?: string;
  name: PageNameEnum | null;
  languageId: string;
  data: LandingPageData | AboutPageData | null;
}
