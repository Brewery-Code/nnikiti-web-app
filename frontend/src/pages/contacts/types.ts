export interface Contacts {
  icon: React.ReactNode;
  title: string;
  description: string;
  links: Contact[] | Location[];
}

export interface Contact {
  position: string;
  name: string;
  email: string;
  audience: string;
}

export interface Location {
  title: string;
  address: string;
  addressLink: string;
}
