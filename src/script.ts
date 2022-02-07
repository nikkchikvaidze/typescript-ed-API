import { getMovie, getCountryData } from "./apicalls";
import { RenderData, RenderSecondData } from "./functions";
import "./style.css";

//VARIABLES
const firstPage = document.getElementById("first") as HTMLDivElement;
const secondPage = document.getElementById("second") as HTMLDivElement;
const downBtn = document.getElementById("arrowdown") as HTMLButtonElement;
const upBtn = document.getElementById("arrowup") as HTMLButtonElement;
const findBtn = document.getElementById("firstinputbtn") as HTMLButtonElement;
const firstPageInput = document.getElementById(
  "firstpageinput"
) as HTMLInputElement;
const firstPageInfo = document.getElementById("firstinfo") as HTMLDivElement;
const secondFindBtn = document.getElementById(
  "secondinputbtn"
) as HTMLButtonElement;
const secondPageInputOne = document.getElementById(
  "secondpageinputone"
) as HTMLInputElement;
const secondPageInputTwo = document.getElementById(
  "secondpageinputtwo"
) as HTMLInputElement;
const secondPageInputThree = document.getElementById(
  "secondpageinputthree"
) as HTMLInputElement;
const totalMovieLength = document.getElementById(
  "movielength"
) as HTMLParagraphElement;
const sumOfPopulation = document.getElementById(
  "sumofpopulation"
) as HTMLParagraphElement;

async function GetMovieData(name: string) {
  let { actor, year, countrydata, poster, title } = await getMovie(name);
  let countryDataArray;
  if (countrydata) {
    countryDataArray = await Promise.all(
      countrydata.map((name) => getCountryData(name))
    );
  }

  return {
    actor,
    year,
    poster,
    title,
    countryDataArray,
  };
}

async function getAllData(firstinp: string, secinp: string, thirdinp: string) {
  let obj1 = await Promise.all([
    getMovie(firstinp),
    getMovie(secinp),
    getMovie(thirdinp),
  ]).then((data) => {
    return data.map((element) => ({
      runtime: element.runtime,
      country: element.countrydata,
    }));
  });

  const runtime = obj1.reduce((acc, current) => {
    if (current.runtime) {
      acc += current.runtime;
    }
    return acc;
  }, 0);
  let totalRuntime = `${Math.floor(runtime / 60)} Hours and ${Math.floor(
    runtime % 60
  )} Minutes`;
  const uniqueCountries = new Set(
    obj1.map((element) => element.country).flat()
  );
  const [...uniqueCountriesArray] = uniqueCountries;
  let totalPopulation = await Promise.all(
    uniqueCountriesArray.map((element) => {
      if (element) {
        return getCountryData(element);
      }
    })
  )
    .then((data) =>
      data.map((element) => {
        if (element) {
          return element.population;
        }
      })
    )
    .then((data) =>
      data.reduce((acc, current) => {
        if (current && acc) {
          acc += current;
        }
        return acc;
      }, 0)
    );

  RenderSecondData(
    totalMovieLength,
    sumOfPopulation,
    totalRuntime,
    totalPopulation
  );
}

// Event Listeners (Buttons)

downBtn.addEventListener("click", () => {
  secondPage.scrollIntoView({ behavior: "smooth" });
});

upBtn.addEventListener("click", () => {
  firstPage.scrollIntoView({ behavior: "smooth" });
});

findBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let InputValue = firstPageInput.value;
  if (InputValue === "") {
    alert("Enter the movie name");
  }
  GetMovieData(InputValue).then((data) => {
    RenderData(data, firstPageInfo);
  });
  firstPageInput.value = "";
});

secondFindBtn.addEventListener("click", function () {
  let firstInput = secondPageInputOne.value;
  let secondInput = secondPageInputTwo.value;
  let thirdInput = secondPageInputThree.value;
  getAllData(firstInput, secondInput, thirdInput);
  secondPageInputOne.value =
    secondPageInputTwo.value =
    secondPageInputThree.value =
      "";
});
