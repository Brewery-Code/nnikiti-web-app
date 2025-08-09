export type Alumni = {
  readonly id?: number | undefined;
  readonly full_name?: string | undefined;
  readonly text?: string | undefined;
  readonly image?: string | undefined;
  readonly created_at?: string | undefined;
  readonly date_of_graduation?: string | undefined;
  links?:
    | {
        [key: string]: string;
      }
    | undefined;
  readonly major?: string | undefined;
  readonly degree?: string | undefined;
  readonly workplace?: string | undefined;
  readonly position?: string | undefined;
};
