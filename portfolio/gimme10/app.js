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

    //DISPLAY THE RANDOMLY GENERATED WORD ALONG WITH ITS DEFINITION (stretch goal -- display ALL the definitions that are also nouns.)
    const displayWord = () => {
        $.ajax(randomWord).then((response) => {
            //console.log(response);
            $("#display-word").html(`
            <h2> ${response.word} </h2>
            <h4> <i>${response.results[0].definition}</i> </h4>
            `)
        })
    }

    //Pick a random question from the roundOneQuestion array and display it.
    const pickFirstQuestion = () => {
        let randomNumber = Math.floor((Math.random()) * roundOneQuestion.length);
        $("#question-field").html(`
            <h4 class="question"> ${roundOneQuestion[randomNumber]} </h4>
        `);
        //console.log(roundOneQuestion[randomNumber]);
    }

    //diplay the word and definition and pair it with a question.
    const getWord = $("#get-word").on('click', () => {
        displayWord();
        pickFirstQuestion();
        $('#answer-section').show();
        $('#set-list').show();
    })

    //Add the user's response to a list and store those responses in local storage (storeReps()). Make the word and question disappear. The submit button appears
    let repIndex = 0;
    const addAnswer = () => {
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
        if (repIndex < 2) {
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
    let storageRep = 0;
    const storeReps = () => {
        localStorage.setItem(storageRep, $('.answer')[storageRep].innerHTML);
        //console.log(localStorage.getItem(storageRep));
        storageRep ++;
    }

    //     const singleRep = () => {
    //         localStorage.setItem('set1-answers', $('.answer')[repIndex].innerHTML);
    //         //console.log($('set1-answers')[0].innerHTML);
    //     }
    // }

    //Clear text from the input field when called.
    const clearText= () => {
        $('#answer-field').val('');
    }

    //Builds the submit button upon completion of the 10th response.
    const buildSetSubmit = () => {
        const setSubmitBtn = $('<button>');
        setSubmitBtn.attr('type', 'button');
        setSubmitBtn.attr('id', 'submit-set');
        setSubmitBtn.text('Submit Set');
        $('#set-list').append(setSubmitBtn);
        //set the open modal even listener
        $('#submit-set').on('click', openModalOne);
    }

    //create a variable for the Set One Modal and the exit button,
    const setOneModal = $('#save-modal');
    //const closeBtn = $('#exit'); -- DON'T NEED?
    //create a function to show the modal
    const openModalOne = () => {
        setOneModal.show();
    }
    
    //set event listener on the Submit button so it moves the answer to the list
    $('#submit').on('click', addAnswer);

    //Function that hides the Question Page and Shows the Character Page when clicking the Modal's continue button.
    const showCharPage = () => {
        $('#question-page').hide();
        $('#character-page').show();
        setOneModal.hide();
        revealCharList();
    }
    $('#continue').on('click', showCharPage);
    
//==========================================
// CHARACTER PAGE
//========================================
    //on page load append the set1-answers list to the h2 element.
    
    const revealCharList = () => {
        //console.log("create list works");
        for (let i=0; i<3; i++) {
            let list = localStorage.getItem(i);
            let createLine = $('<li>').addClass('list-item');
            let addListText = $(createLine).text(list);
            $('#char-list').append(addListText);
            //console.log(list);
        }
    }

    //SUBMIT BUTTON: Add listener to load description to localStorage. Open Modal2. Display char description in modal2. Congratulate them on creating a character. Provide a HOME button if they would like to create another one.

    //Store character description in local storage 
    const storeCharDesc = () => {
        const boxText = $('#users-char').val();
        localStorage.setItem('charDescription', boxText);
        //console.log(boxText);
    }

    //Reveal character description in modal2
    const revealCharDesc = () => {
        let charDescription = localStorage.getItem('charDescription');
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
//get modal2's formatting to center on page and darken out the background page

    
});