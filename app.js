const $ = require("jquery");
const nouns = require("./public/nouns.js");
const adjectives = require("./public/adjectives.js");

const roundOneQuestion = [
  "Describe a person who might use this phrase a lot.",
  "If this phrase were a person, what would its average day look like?",
  "If this phrase were a character in a comicbook, what would its backstory be?",
  "Describe an occupation where this phrase might come up on a regular basis.",
  "You're sitting in a movie theatre and the person behind you uses this phrase in a conversation. What do you imagine they look like?",
];

const pickNoun = nouns[Math.floor(Math.random() * nouns.length)];
const pickAdjective = adjectives[Math.floor(Math.random() * nouns.length)];
const vowels = /[aeiou]/;

const article = () => {
  if (pickAdjective[0].match(vowels)) {
    return "an";
  } else {
    return "a";
  }
};

const createLine = () => {
  return article() + " " + pickAdjective + " " + pickNoun;
};

$(() => {
  //============PAGE ONE PROJECT CREATION/ RETURN TO OLD PROJECT=======
  //=======New Project Path==============
  //Check for new project name in input field
  const nameCheck = () => {
    if (!$("#new-project").val()) {
      alert("You must create a name for your project");
    } else {
      projectCheck();
    }
  };
  // Check to see if an old project exists. Give warning of erasure if it does.
  const projectCheck = () => {
    if (localStorage.getItem("proj1-0")) {
      if (confirm("Creating a new project will erase your old project.")) {
        //erase all the old project data. Start new Project.
        localStorage.clear();
        localStorage.setItem("proj1-name", $("#new-project").val());
        startProject();
      }
    } else {
      localStorage.setItem("proj1-name", $("#new-project").val());
      startProject();
    }
  };

  //Hide the Intro Page and show the Question Page
  const startProject = () => {
    $("#intro-page").hide();
    $("#question-page").show();
  };

  $("#name-submit").on("click", nameCheck);
  //================Return To Project Path=================
  //Check localStorage for project information and load it into the answer sheet
  //Check to see if a project already exists
  const checkForProject = () => {
    if (!localStorage.getItem("proj1-0")) {
      alert("You don't currently have any active projects");
    } else {
      // Show Question Page with all of the information filled in.
      revealProject();
    }
  };

  //Grabs the saved question and saves it to a variable.
  let getQuestion = localStorage.getItem("proj1-question");
  //Displays the saved question
  const displaySavedQuestion = () => {
    //console.log("getQuestion= " + getQuestion);
    $("#question-field").html(`
            <h4 class="question"> ${getQuestion} </h4>
        `);
  };

  //GET THE OLD PHRASE
  //Assign the stored phrase value to a variable.
  let getSavedPhrase = localStorage.getItem("proj1-phrase");
  //Display saved word and definition
  const displaySavedPhrase = () => {
    $("#display-phrase").html(`
            <h2> ${getSavedPhrase} </h2>
            `);
    $("#display").show();
  };

  //create a variable for the Set One Modal and the exit button,
  const setOneModal = $("#save-modal");
  //create a function to show the modal
  const openModalOne = () => {
    setOneModal.show();
  };

  //Builds the submit button upon completion of the 5th response.
  const buildSetSubmit = () => {
    const setSubmitBtn = $("<button>");
    setSubmitBtn.attr("type", "button");
    setSubmitBtn.attr("id", "submit-set");
    setSubmitBtn.text("Submit Set");
    $("#set-list").append(setSubmitBtn);
    $("#submit-set").on("click", openModalOne);
  };

  //cycle through the project's local storage and load in saved answers
  const fillForm = () => {
    $("#answer-section").show();
    $("#set-list").show();
    for (let i = 0; localStorage.getItem("proj1-" + i); i++) {
      let displayNum = i + 1;
      //create variables for: new table row, value of storage data, and the rep number.
      const answerRow = $("<tr>").addClass("table-row");
      const storageValue = localStorage.getItem("proj1-" + i);
      const repNum = $("<td>")
        .addClass("rep")
        .attr("id", "rep" + i)
        .text(displayNum);
      //create the answer data cell. Add the storage Value.
      const answer = $("<td>")
        .addClass("answer")
        .attr("id", "answer" + i)
        .text(storageValue);
      //Append the data cells to the row and the row to the table body.
      $(answerRow).append(repNum, answer);
      $("tbody").append(answerRow);
      if (i == 4) {
        //Remove the answer section and add the "submit set" button.
        $("#answer-section").remove();
        buildSetSubmit();
      }
    }
  };

  const revealProject = () => {
    startProject();
    displaySavedQuestion();
    displaySavedPhrase();
    fillForm();
    $("#get-phrase").remove();
  };

  $("#continue-project").on("click", checkForProject);
  //==============Start Working Out With Gimme5 ==============
  //DISPLAY THE RANDOMLY GENERATED LINE

  const displayLine = () => {
    $("#display").show();
    $("#display-phrase").html(`
                <h2 id='phrase'> ${createLine()} </h2>
            `);
    localStorage.setItem("proj1-phrase", createLine());
  };

  //Pick a random question from the roundOneQuestion array and display it.
  let question;
  const pickQuestion = () => {
    let randomNumber = Math.floor(Math.random() * roundOneQuestion.length);
    question = roundOneQuestion[randomNumber];
    displayQuestion();
  };

  const displayQuestion = () => {
    $("#question-field").html(`
            <h4 id="question"> ${question} </h4>
        `);
    //Save this question to Project One local storage
    localStorage.setItem("proj1-question", question);
  };

  //diplay the word and definition and pair it with a question.
  const getPhrase = $("#get-phrase").on("click", () => {
    displayLine();
    pickQuestion();
    $("#answer-section").show();
    $("#answer-field").attr("required", "true");
    $("#set-list").show();
  });

  //Make answers and project name submit upon hitting enter
  const enterClick = $("#answer-field");
  enterClick.on("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#submit").click();
    }
  });

  const projectClick = $("#new-project");
  projectClick.on("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#name-submit").click();
    }
  });

  //Add the user's response to a list and store those responses in local storage (storeReps()). Make the word and question disappear. The submit button appears
  const addAnswer = () => {
    let repIndex = 0;
    while (localStorage.getItem("proj1-" + repIndex)) {
      repIndex++;
      if (repIndex > 5) {
        return false;
      }
    }
    let displayNum = repIndex + 1;
    //create variables for: new table row, value of input field, and the rep number.
    const answerRow = $("<tr>").addClass("table-row");
    const inputValue = $("#answer-field").val();
    const repNum = $("<td>")
      .addClass("rep")
      .attr("id", "rep" + displayNum)
      .text(displayNum);
    //create the answer data cell. Add the input Value.
    const answer = $("<td>")
      .addClass("answer")
      .attr("id", "answer" + displayNum)
      .text(inputValue);
    //Append the data cells to the row and the row to the table body.
    $(answerRow).append(repNum, answer);
    $("tbody").append(answerRow);
    if (repIndex < 4) {
      //console.log("submit works");
      storeReps();
      clearText();
      repIndex++;
    } else {
      //For the 5th answer. This avoids the problem of the last item not displaying.
      storeReps();
      repIndex++;
      //Remove the answer section and add the "submit set" button.
      $("#answer-section").remove();
      buildSetSubmit();
    }
  };

  //Function that stores responses in local storage with "storageRep" # as their key.
  const storeReps = () => {
    let storageRep = 0;
    while (localStorage.getItem("proj1-" + storageRep)) {
      storageRep++;
      if (storageRep > 5) {
        return false;
      }
    }
    localStorage.setItem(
      "proj1-" + storageRep,
      $(".answer")[storageRep].innerHTML
    );
  };

  //Clear text from the input field when called.
  const clearText = () => {
    $("#answer-field").val("");
  };

  //set event listener on the Submit button so it moves the answer to the list
  $("#submit").on("click", addAnswer);

  //Function that hides the Question Page and Shows the Character Page when clicking the Modal's continue button.
  const showCharPage = () => {
    $("#question-page").hide();
    $("#character-page").show();
    setOneModal.hide();
    revealChar();
  };
  $("#continue").on("click", showCharPage);

  //==========================================
  // CHARACTER PAGE
  //========================================
  //on page load append the set1-answers list to the h2 element.

  const revealChar = () => {
    for (let i = 0; i < 5; i++) {
      let list = localStorage.getItem("proj1-" + i);
      let createLine = $("<li>").addClass("list-item");
      let addListText = $(createLine).text(list);
      $("#char-list").append(addListText);
    }
    if (localStorage.getItem("proj1-charDescription")) {
      $("#users-char").text(localStorage.getItem("proj1-charDescription"));
    }
  };

  //Store character description in local storage
  const storeCharDesc = () => {
    const boxText = $("#users-char").val();
    localStorage.setItem("proj1-charDescription", boxText);
  };

  //Reveal character description in modal2
  const revealCharDesc = () => {
    let charDescription = localStorage.getItem("proj1-charDescription");
    let createDisplay = $("<p>").attr("id", "finalCharDesc");
    let addCharDesc = $(createDisplay).text(charDescription);
    $("#char-display-desc").append(addCharDesc);
  };

  //add listener to #char-submit button. Have it run storeCharDesc and open Modal2.
  $("#char-submit").on("click", (event) => {
    event.preventDefault();
    storeCharDesc();
    revealCharDesc();
    $("#modal-2").show();
  });
});
