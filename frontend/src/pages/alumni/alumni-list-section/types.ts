export type Alumni = {
  id: number;
  full_name: string;
  text: string;
  image: string;
  created_at: string;
  date_of_graduation: string;
  major: string;
  degree: string;
  workplace: string;
  position: string;
  links: {
    instagram?: string;
    telegram?: string;
    facebook?: string;
  };
};
