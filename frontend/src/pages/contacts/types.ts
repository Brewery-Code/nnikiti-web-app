interface BaseContacts {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Contact {
  position: string;
  name: string;
  email: string;
  audience?: string;
  link?: string;
}

interface Location {
  title: string;
  address: string;
  addressLink: string;
}

export interface ContactInfo extends BaseContacts {
  links: Contact[];
}

export interface LocationInfo extends BaseContacts {
  links: Location[];
}
