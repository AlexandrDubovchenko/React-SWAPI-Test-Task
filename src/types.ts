export type Person = {
  name: string;
  birth_year: string;
  films: string[];
  species: string[];
  starships: string[];
  url: string;
};

export type Species = {
  name: string;
  people: string[];
  films: string[];
  url: string;
};

export type Film = {
  title: string;
  characters: string[];
  url: string;
};

export type Starship = {
  title: string;
  url: string;
};

export type FilterOption = { url: string; people: string[] };
