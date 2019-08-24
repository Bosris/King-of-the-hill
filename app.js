let characterNameInput = document.querySelector("#character-name");
let classSelected = document.querySelector("#class-selected");
let characterSubmitBtn = document.querySelector("#character-submit");
let iceWizardPic = "https://i.imgur.com/Vo9Ycuv.png";
let archerPic = "https://i.imgur.com/B9RpRYo.png";
let knightPic = "https://i.imgur.com/Nefioe9.png";

class Player {
  constructor(name, classPicked) {
    this.name = name;
    this.classPicked = classPicked;
    this.classPhoto;
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
    console.log("yes");
    let chooseFighterDiv = document.querySelector(".container-fighters");

    let allPlayers = JSON.parse(localStorage.getItem("players"));
    let allPlayersArray = allPlayers.players;

    for (let i = 0; i < allPlayersArray.length; i++) {
      console.log("yesssir");
      chooseFighterDiv.innerHTML += `<div class="container-fighters-div">
        <img src="${allPlayersArray[i].classPhoto}"><p>${allPlayersArray[i].name}</p>
        <input class="fighter-selected" type="checkbox">
        </div>`;
    }
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
      classPhoto: newPlayer.classPhoto
    };
    console.log(playerOBJ);
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
          classPhoto: newPlayer.classPhoto
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

loadLocalStorage();

// var string = '{"items":[{"Desc":"Item1"},{"Desc":"Item2"}]}';
// localStorage.setItem('added-items', JSON.stringify(string));
