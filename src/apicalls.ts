import { Moviedata, Countrydata } from "./models";
const movieApiKey: string = "5bbba32d";

export function getMovie(name: string): Promise<Moviedata> {
  return fetch(
    `http://www.omdbapi.com/?t=${name}&plot=full&apikey=${movieApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      return {
        actor: data.Actors.split(", ").map(
          (el: string) => el.trim().split(" ")[0]
        ),
        countrydata: data.Country.split(", "),
        year: parseInt(data.Year),
        poster: data.Poster,
        title: data.Title,
        runtime: parseInt(data.Runtime),
      };
    });
}

export function getCountryData(country: string): Promise<Countrydata> {
  return fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then((res) => res.json())
    .then((data) => {
      return {
        currencies: Object.keys(data[0].currencies)[0],
        flags: data[0].flags.png,
        name: country,
        population: data[0].population,
      };
    });
}
