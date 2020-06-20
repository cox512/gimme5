const roundOneQuestion = ["Briefly describe a character who you associate with this word", "Name an occupation that you might associate with this word", "If this word were a character in a comicbook, what would be its defining flaw"]


$(() => {
    //WORDSAPI SET-UP. CONTACT FOR WORD.
    const randomWord = {
        "async": true,
        "crossDomain": true,
        "url": "https://wordsapiv1.p.rapidapi.com/words/?partOfSpeech=noun&lettersMax=7&hasDetails=synonyms,also&random=true",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "6bdd5dbc83mshd1a0b82422d6f4bp1fb182jsn320ccba670a2"
        }
    }

//============PAGE ONE PROJECT CREATION/ RETURN TO OLD PROJECT=======
    //=======New Project Path==============
    //Check for new project name in input field
    const nameCheck = () => {
        if(!$('#new-project').val()) {
            alert("You must create a name for your project");
        } else {
            projectCheck();
        }
    }
    // Check to see if an old project exists. Give warning of erasure if it does.
    const projectCheck = () => {
        if(localStorage.getItem('proj1-name')) {
            if (confirm("Creating a new project will erase your old project.")) {
    //erase all the old project data. Start new Project.
                localStorage.clear();
                localStorage.setItem('proj1-name', $('#new-project').val())
                startProject();
            }
        } else {
            localStorage.setItem('proj1-name', $('#new-project').val())
            startProject();
        }
    }
        
    //Hide the Intro Page and show the Question Page
    const startProject = () => {
        $('#intro-page').hide();
        $('#question-page').show();
    }

    $('#name-submit').on('click', nameCheck);
//================Return To Project Path=================
  //Check localStorage for project information and load it into the answer sheet
    //Check to see if a project already exists
    const checkForProject = () => {
        if(!localStorage.getItem('proj1-name')) {
            alert("You don't currently have any active projects")
        } else {
            // Show Question Page with all of the information filled in.
            revealProject();
        }
    }
    
    //Grabs the saved question and saves it to a variable.
    let getQuestion = localStorage.getItem('proj1-question');
    //Displays the saved question
    const displaySavedQuestion = () => {
        console.log("getQuestion= " + getQuestion);
        $("#question-field").html(`
            <h4 class="question"> ${getQuestion} </h4>
        `);
    }

    //GET THE OLD WORD AND DEFINITION
    //Assign the stored word and definition values to variables. 
    let getSavedWord = localStorage.getItem('proj1-word');
    let getSavedDefinition = localStorage.getItem('proj1-def');
    //Display saved word and definition
    const displaySavedWord = () => {
        $("#display-word").html(`
            <h2> ${getSavedWord} </h2>
            <h4> <i>${getSavedDefinition}</i> </h4>
            `);
        }
    
    //create a variable for the Set One Modal and the exit button,
    const setOneModal = $('#save-modal');
    //create a function to show the modal
    const openModalOne = () => {
        setOneModal.show();
    }

    //Builds the submit button upon completion of the 5th response.
    const buildSetSubmit = () => {
        const setSubmitBtn = $('<button>');
        setSubmitBtn.attr('type', 'button');
        setSubmitBtn.attr('id', 'submit-set');
        setSubmitBtn.text('Submit Set');
        $('#set-list').append(setSubmitBtn);
        //this was added before break
        $('#submit-set').on('click', openModalOne);
    }

    //cycle through the project's local storage and load in saved answers
    const fillForm = () => {
        $('#answer-section').show();
        $('#set-list').show();
        for (let i=0; localStorage.getItem('proj1-'+i); i++) {
            //console.log('starting fillForm');
            let displayNum = i + 1;
            //create variables for: new table row, value of storage data, and the rep number.
            const answerRow = $('<tr>').addClass('table-row');
            const storageValue = localStorage.getItem('proj1-'+i);;
            const repNum = $('<td>').addClass('rep').attr('id', 'rep' + i).text(displayNum);
            //create the answer data cell. Add the storage Value.
            const answer = $('<td>').addClass('answer').attr('id', ('answer' + i)).text(storageValue);
            //Append the data cells to the row and the row to the table body.
            $(answerRow).append(repNum, answer);
            $('tbody').append(answerRow);
            console.log(storageValue);
            if (i==4) {
                //Remove the answer section and add the "submit set" button.
                $('#answer-section').remove();
                buildSetSubmit();
                //console.log("running fillForm's if statement")
            }   
        }
    }
    
    const revealProject = () => {
        console.log("reveal Project works")
        startProject();
        displaySavedQuestion();
        displaySavedWord();
        fillForm();
        $('#get-word').remove();

    }

    $('#continue-project').on('click', checkForProject);
//==============Start Working Out With Gimme5 ==============
    //DISPLAY THE RANDOMLY GENERATED WORD ALONG WITH ITS DEFINITION 
    
    const pickWord = () => {
        $.ajax(randomWord).then((response) => {
        $("#display-word").html(`
            <h2> ${response.word} </h2>
            <h4> <i>${response.results[0].definition}</i> </h4>
            `);
        localStorage.setItem('proj1-word', response.word);
        localStorage.setItem('proj1-def', response.results[0].definition);
        })
    }

    //Pick a random question from the roundOneQuestion array and display it.
    let question;
    const pickQuestion = () => {
        let randomNumber = Math.floor((Math.random()) * roundOneQuestion.length);
        question = roundOneQuestion[randomNumber];
        displayQuestion();
    }

    const displayQuestion = () => {
        $("#question-field").html(`
            <h4 class="question"> ${question} </h4>
        `);
        //Save this question to Project One local storage        
        localStorage.setItem('proj1-question', question);
    }

    //diplay the word and definition and pair it with a question.
    const getWord = $("#get-word").on('click', () => {
        pickWord();
        pickQuestion();
        $('#answer-section').show();
        $('#answer-field').attr('required', 'true');
        $('#set-list').show();
    })

    //Make answers submit upon hitting enter
    const enterClick = $('#answer-field');
    enterClick.on('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            $('#submit').click();
        }
    })
    

    //Add the user's response to a list and store those responses in local storage (storeReps()). Make the word and question disappear. The submit button appears
    //let repIndex = 0;
    const addAnswer = () => {
        let repIndex=0;
        while (localStorage.getItem('proj1-'+repIndex)) {
            repIndex++
            if (repIndex>5) {
                return false;
            }
        }
        let displayNum = repIndex + 1;
        //create variables for: new table row, value of input field, and the rep number.
        const answerRow = $('<tr>').addClass('table-row');
        const inputValue = $('#answer-field').val();
        const repNum = $('<td>').addClass('rep').attr('id', 'rep' + displayNum).text(displayNum);
        //create the answer data cell. Add the input Value.
        const answer = $('<td>').addClass('answer').attr('id', ('answer' + displayNum)).text(inputValue);
        //Append the data cells to the row and the row to the table body.
        $(answerRow).append(repNum, answer);
        $('tbody').append(answerRow);
        if (repIndex < 4) {
            //console.log("submit works");
            storeReps();
            clearText();
            repIndex++;
        } else {
            //For the 10th answer. This avoids the problem of the last item not displaying.
            storeReps();
            repIndex++;
            //Remove the answer section and add the "submit set" button.
            $('#answer-section').remove();
            buildSetSubmit();
        }
    }

    //Function that stores responses in local storage with "storageRep" # as their key.
    
    const storeReps = () => {
        let storageRep=0;
        while (localStorage.getItem('proj1-'+storageRep)) {
            storageRep++
            if (storageRep>5) {
                return false;
            }
        }
        localStorage.setItem(('proj1-' + storageRep), $('.answer')[storageRep].innerHTML);
        //console.log(localStorage.getItem(storageRep));
        //storageRep ++;
    }

    //Clear text from the input field when called.
    const clearText= () => {
        $('#answer-field').val('');
    }
    
    //set event listener on the Submit button so it moves the answer to the list
    $('#submit').on('click', addAnswer);

    //Function that hides the Question Page and Shows the Character Page when clicking the Modal's continue button.
    const showCharPage = () => {
        $('#question-page').hide();
        $('#character-page').show();
        setOneModal.hide();
        revealChar();
    }
    $('#continue').on('click', showCharPage);
    
    
//==========================================
// CHARACTER PAGE
//========================================
    //on page load append the set1-answers list to the h2 element.
    
    const revealChar = () => {
        //console.log("create list works");
        for (let i=0; i<5; i++) {
            let list = localStorage.getItem('proj1-' + i);
            let createLine = $('<li>').addClass('list-item');
            let addListText = $(createLine).text(list);
            $('#char-list').append(addListText);
            //console.log(list);
        }
        if (localStorage.getItem('proj1-charDescription')) {
            $('#users-char').text(localStorage.getItem('proj1-charDescription'));
        }
    }

    //Store character description in local storage 
    const storeCharDesc = () => {
        const boxText = $('#users-char').val();
        localStorage.setItem('proj1-charDescription', boxText);
        //console.log(boxText);
    }

    //Reveal character description in modal2
    const revealCharDesc = () => {
        let charDescription = localStorage.getItem('proj1-charDescription');
        let createDisplay = $('<p>').attr('id', 'finalCharDesc');
        let addCharDesc = $(createDisplay).text(charDescription);
        $('#char-display-desc').append(addCharDesc);
        console.log(charDescription);
    }

    //add listener to #char-submit button. Have it run storeCharDesc and open Modal2. 
    $('#char-submit').on('click', (event) => {
        event.preventDefault();
        storeCharDesc();
        revealCharDesc();
        $('#modal-2').show();
    })

});