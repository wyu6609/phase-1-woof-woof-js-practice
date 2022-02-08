//render dogs

function renderDog(el) {
  //create span tag for each el with dog name
  const dogSpan = document.createElement("span");
  dogSpan.innerHTML = el.name;
  //dogBar functionality
  dogSpan.addEventListener("click", () => {
    document.querySelector("#dog-info").innerHTML = `
    <img src="${el.image}" />
    <h2>${el.name}</h2>
    <button id = "dog-Button">${
      el.isGoodDog ? "Good dog!" : "Bad dog!"
    }</button>
  `;
    //good dog bad dog toggle (PATCH API request)
    document.getElementById("dog-Button").addEventListener("click", () => {
      el.isGoodDog = !el.isGoodDog;

      document.getElementById("dog-Button").textContent =
        el.isGoodDog === true ? "Good dog!" : "Bad dog!";
      updateDoggo(el);
    });
  });

  document.getElementById("dog-bar").appendChild(dogSpan);
}

//dog button functionality

//fetch API
function getAPI() {
  fetch("http://localhost:3000/pups")
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      initialize(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//PATCH Request
function updateDoggo(dogObj) {
  fetch(` http://localhost:3000/pups/${dogObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((err) => {
      console.log("Error:", error);
    });
  console.log(dogObj);
}

//filter

function initialize(data) {
  // loop through array of Objs
  //   document.querySelector("#good-dog-filter").addEventListener("click", () => {
  //     console.log(data)
  //     let toggle = "OFF"
  //     document.querySelector("#good-dog-filter").textContent = `Filter good dogs: ${toggle}`
  //   });
  data.forEach((el) => renderDog(el));
}

getAPI();
