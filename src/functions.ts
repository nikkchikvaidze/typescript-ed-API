import { Moviedata } from "./models";

function CalculateDate(date: number): number {
  return new Date().getFullYear() - date;
}

export function RenderData(
  { year, poster, actor, countryDataArray }: Moviedata,
  page: HTMLDivElement
) {
  const actorNames = actor.join(", ");
  let countryDataTemplate = "";
  if (countryDataArray) {
    for (let country of countryDataArray) {
      countryDataTemplate += `${country.name}, ${country.currencies} <img style="width:20px" src=${country.flags}> <br>`;
    }
  }

  let html = `<img id="firstimg" src="${poster}" alt="" />
      <ul id="firstul">
        <li id="year">Released ${CalculateDate(year)} years ago</li>
        <li id="actor">Actors: ${actorNames}</li>
        <li id="country">Country: ${countryDataTemplate}</li>
      </ul>`;
  page.innerHTML = "";
  page.insertAdjacentHTML("beforeend", html);
  page.style.opacity = "1";
}

export function RenderSecondData(
  text1: HTMLParagraphElement,
  text2: HTMLParagraphElement,
  length: string,
  population: number = 0
) {
  text1.textContent = `The length of all the movies: ${length}`;
  text2.textContent = `Sum of population of all the countries: ${population}`;
}
