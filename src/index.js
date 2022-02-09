//global dom Nodes & constants
const insertDogsHere = document.getElementById("dog-bar");
const insertDogInfoHere = document.getElementById("dog-info");
const filterButton = document.getElementById("good-dog-filter");
let filterButtonState = false; //off
// filter button functionality
filterButton.addEventListener("click", () => {
  filterButtonState = !filterButtonState;
  filterButton.innerText = filterButtonState
    ? "Filter good dogs: ON"
    : "Filter good dogs: OFF";
});
//fetch dog API
function fetchDogs() {
  fetch("http://localhost:3000/pups")
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:");
      //if successful initialize data
      initializeData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
//patch dogOBJ
function patchDogObj(dogObj) {
  fetch(`http://localhost:3000/pups/${dogObj.id}`, {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogObj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
//initialize data
function initializeData(dogData) {
  //cycle through the json data (an array of objects) & render each object onto the DOM
  dogData.forEach((dog) => {
    renderDogs(dog);
  });
}

//render Dogs
function renderDogs(dogObj) {
  //create individual dog Span
  const dogSpan = document.createElement("span");
  //place name into new span element
  dogSpan.innerHTML = dogObj.name;
  //add click functionality to each span
  dogSpan.addEventListener("click", () => {
    displaySelected(dogObj);
  });
  //append dog spans into the dog-bar div
  insertDogsHere.appendChild(dogSpan);
}

function displaySelected(dogObj) {
  let dogProp = dogObj.isGoodDog;
  console.log(dogObj);
  console.log(dogObj.image, dogObj.name, dogObj.isGoodDog);
  //create dog Display
  let dogInfo = `
  <img src="${dogObj.image}" />
<h2>${dogObj.name}</h2>
<button id = "good-bad-dog-button">${
    dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"
  }</button>`;

  //innerHTML dogInfo into the display container
  insertDogInfoHere.innerHTML = dogInfo;
  document
    .getElementById("good-bad-dog-button")
    .addEventListener("click", () => {
      console.log("clicked");
      goodDogButtonFunction(dogObj);
      // updateDogJSON(dogObj);
    });
}

//updates button name when clicked
function goodDogButtonFunction(dogObj) {
  dogObj.isGoodDog = !dogObj.isGoodDog;
  document.getElementById("good-bad-dog-button").innerText = dogObj.isGoodDog
    ? "Good Dog!"
    : "Bad Dog!";
  patchDogObj(dogObj);
}

//call to fetchAPI and initiate the app
fetchDogs();
