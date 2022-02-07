export interface Moviedata {
  year: number;
  poster: string;
  actor: string[];
  countrydata?: string[];
  title: string;
  countryDataArray?: Countrydata[];
  runtime?: number;
}

export interface Countrydata {
  flags: string;
  currencies: string;
  name: string;
  population: number;
}
