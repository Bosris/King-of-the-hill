let characterNameInput = document.querySelector("#character-name");
let classSelected = document.querySelector("#class-selected");
let characterSubmitBtn = document.querySelector("#character-submit");
let fightBtn = document.querySelector(".fight-btn");
let chatText = document.querySelector(".container-innerchat");
let kingPicture = document.querySelector(".current-king-img-container");
let currentKingName = document.querySelector(".current-king");
let currentKingWins = document.querySelector(".current-king-wins");

let iceWizardPic = "https://i.imgur.com/Vo9Ycuv.png";
let archerPic = "https://i.imgur.com/B9RpRYo.png";
let knightPic = "https://i.imgur.com/Nefioe9.png";

class Player {
  constructor(name, classPicked) {
    this.name = name;
    this.classPicked = classPicked;
    this.classPhoto;
    this.wins = 0;
  }

  playerClassPic(data) {
    if (data === "knight") {
      this.classPhoto = knightPic;
    }
    if (data === "archer") {
      this.classPhoto = archerPic;
    }
    if (data === "icewizard") {
      this.classPhoto = iceWizardPic;
    }
  }
}

function loadLocalStorage() {
  if (!localStorage.getItem("players")) {
    return;
  } else {
    let chooseFighterDiv = document.querySelector(".container-fighters");

    let allPlayers = JSON.parse(localStorage.getItem("players"));
    let allPlayersArray = allPlayers.players;

    for (let i = 0; i < allPlayersArray.length; i++) {
      chooseFighterDiv.innerHTML += `<div class="container-fighters-div">
        <img src="${allPlayersArray[i].classPhoto}"><p>${allPlayersArray[i].name}</p>
        <input class="fighter-selected" type="checkbox">
        </div>`;
    }
    playerStatsDisplay();
    loadCheckBoxListener();
  }
}

function loadCheckBoxListener() {
  let fighterSelected = document.querySelectorAll(".fighter-selected");

  let limit = 2;
  fighterSelected.forEach(element => {
    element.addEventListener("click", function() {
      let numOfFighterSelected = document.querySelectorAll(
        ".fighter-selected:checked"
      ).length;
      if (numOfFighterSelected > limit) {
        element.checked = false;
      }
    });
  });
}

classSelected.addEventListener("change", function() {
  let classPhoto = document.querySelector("#character-class-photo");
  if (classSelected.value === "icewizard") {
    classPhoto.src = iceWizardPic;
  }
  if (classSelected.value === "knight") {
    classPhoto.src = knightPic;
  }
  if (classSelected.value == "archer") {
    classPhoto.src = archerPic;
  }
});

characterSubmitBtn.addEventListener("click", function() {
  let chooseFighterDiv = document.querySelector(".container-fighters");

  let newPlayer = new Player(characterNameInput.value, classSelected.value);
  newPlayer.playerClassPic(classSelected.value);

  //if it already exists in the storage
  if (localStorage.getItem("players")) {
    let playerOBJ = {
      name: newPlayer.name,
      class: newPlayer.classPicked,
      classPhoto: newPlayer.classPhoto,
      wins: newPlayer.wins
    };
    let currentStoredPlayers = [];
    //get the current data and parse it so we can use it
    currentStoredPlayers = JSON.parse(localStorage.getItem("players"));

    //then push the current data
    currentStoredPlayers.players.push(playerOBJ);
    //then reset the local storage;
    localStorage.setItem("players", JSON.stringify(currentStoredPlayers));
  } else {
    let playerOBJ = {
      players: [
        {
          name: newPlayer.name,
          class: newPlayer.classPicked,
          classPhoto: newPlayer.classPhoto,
          wins: newPlayer.wins
        }
      ]
    };
    localStorage.setItem("players", JSON.stringify(playerOBJ));
  }
  chooseFighterDiv.innerHTML += `<div class="container-fighters-div">
    <img src="${newPlayer.classPhoto}"><p>${newPlayer.name}</p>
    <input class="fighter-selected" type="checkbox">
    </div>`;
  loadCheckBoxListener();
});

fightBtn.addEventListener("click", function() {
  let fighterOne = document.querySelectorAll(".fighter-selected:checked")[0]
    .previousElementSibling.innerHTML;
  let fighterTwo = document.querySelectorAll(".fighter-selected:checked")[1]
    .previousElementSibling.innerHTML;
  let currentStorage = JSON.parse(localStorage.getItem("players"));
  let newPlayerObj = {
    players: null
  };

  let chooseFighterDiv = document.querySelector(".container-fighters");

  if (Math.random() < 0.5) {
    console.log(fighterOne);
    let newFilterStorage = currentStorage.players.filter(
      element => element.name !== fighterTwo
    );

    //add wins to it
    newFilterStorage.forEach(element => {
      if (element.name === fighterOne) {
        element.wins++;
      }
    });

    newPlayerObj.players = newFilterStorage;
    localStorage.setItem("players", JSON.stringify(newPlayerObj));
    console.log(newFilterStorage);
    chooseFighterDiv.innerHTML = "";
    chatText.innerHTML += `<p>${fighterOne} has won the fight! ${fighterTwo} will be elimated</p>`;
    loadLocalStorage();
    playerStatsDisplay();
  } else {
    let newFilterStorage = currentStorage.players.filter(
      element => element.name !== fighterOne
    );

    newFilterStorage.forEach(element => {
      if (element.name === fighterTwo) {
        element.wins++;
      }
    });

    newPlayerObj.players = newFilterStorage;
    localStorage.setItem("players", JSON.stringify(newPlayerObj));
    chooseFighterDiv.innerHTML = "";
    chatText.innerHTML += `<p>${fighterTwo} has won the fight! ${fighterOne} will be elimated</p>`;
    loadLocalStorage();
    playerStatsDisplay();
  }
});

function playerStatsDisplay() {
  let currentStorage = JSON.parse(localStorage.getItem("players"));
  let mostWinsOBJ;
  let counter = 0;

  currentStorage.players.forEach(element => {
    if (element.wins > counter) {
      counter = element.wins;
      mostWinsOBJ = element;
    }
  });

  //display the data
  kingPicture.innerHTML = `<img src=${mostWinsOBJ.classPhoto} /> `;
  currentKingName.textContent = `Current King: ${mostWinsOBJ.name}`;
  currentKingWins.textContent = `Wins: ${mostWinsOBJ.wins}`;
  console.log(counter);
  console.log(mostWinsOBJ.classPhoto);
}

loadLocalStorage();

// var string = '{"items":[{"Desc":"Item1"},{"Desc":"Item2"}]}';
// localStorage.setItem('added-items', JSON.stringify(string));
